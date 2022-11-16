import { Web3Provider } from '@ethersproject/providers'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { doWalletLogin, getSignatureCode } from 'backend'
import { LSK_ACCESS_TOKEN } from 'constants/'
import { ethers } from 'ethers'
import React from 'react'
import { AccountAccessTokenJWTPayload } from 'types'
import useLocalStorageState from 'use-local-storage-state'
import { getAccessTokenPayload, isAccountTokenExpired } from 'utils'

export function useWeb3Account() {
  const [{ wallet }, connectWallet, disconnectWallet] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()

  const account = React.useMemo<string | null>(() => {
    if (!wallet) return null
    if (!Array.isArray(wallet.accounts) || wallet.accounts.length === 0)
      return null
    return wallet.accounts[0].address
  }, [wallet])

  const provider = React.useMemo<Web3Provider | null>(() => {
    if (!wallet) return null
    return new ethers.providers.Web3Provider(wallet.provider)
  }, [wallet])

  const connect = React.useCallback(async () => {
    const state = await connectWallet()
    if (!Array.isArray(state) || !state.length) return null
    return state[0]
  }, [connectWallet])

  const disconnect = React.useCallback(async () => {
    if (wallet) await disconnectWallet(wallet)
  }, [disconnectWallet, wallet])

  const switchNetwork = React.useCallback(
    async (chainId: string) => {
      if (connectedChain && connectedChain.id === chainId) return true
      return await setChain({ chainId })
    },
    [connectedChain, setChain]
  )

  return { account, provider, connect, disconnect, switchNetwork }
}

type UseIffAccount = {
  walletLogin: () => Promise<void>
}

export function useIffAccount(): UseIffAccount {
  const {
    account: previousAccount,
    connect,
    disconnect,
    switchNetwork,
  } = useWeb3Account()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const getWalletSignCode = React.useCallback(async (account: string) => {
    if (!account) return null
    const res = await getSignatureCode(account)
    if (res.code) return res.code
    return null
  }, [])

  const getWalletSignSignature = React.useCallback(
    async (code: string, provider: Web3Provider) => {
      if (!provider) return null
      const signer = provider.getSigner()
      const account = await signer.getAddress()
      const signature = await signer.signMessage(code)
      console.debug('account', account, 'signature', signature)
      return signature
    },
    []
  )

  const walletLogin = React.useCallback<
    UseIffAccount['walletLogin']
  >(async () => {
    if (previousAccount) await disconnect()
    const state = await connect()
    if (!state) return
    const chainState = await switchNetwork('0x1')
    if (!chainState) return
    const account = state.accounts[0].address
    const provider = new ethers.providers.Web3Provider(state.provider)
    const code = await getWalletSignCode(account)
    if (!code) throw new Error('No signature code')
    const sig = await getWalletSignSignature(code, provider)
    if (!sig) throw new Error('No sign signature')
    const { accessToken } = await doWalletLogin(account, sig)
    setAccessToken(accessToken)
  }, [
    connect,
    disconnect,
    getWalletSignCode,
    getWalletSignSignature,
    previousAccount,
    setAccessToken,
    switchNetwork,
  ])

  return { walletLogin }
}

type UseAccountInfo = {
  account?: AccountAccessTokenJWTPayload
  expired: boolean
  remove: () => void
}

export function useAccountInfo(): UseAccountInfo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, _, { removeItem }] =
    useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const account = React.useMemo(() => {
    if (!accessToken) return undefined
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

  const expired = React.useMemo(() => {
    if (!accessToken) return true
    return isAccountTokenExpired(accessToken)
  }, [accessToken])

  const remove = React.useCallback(() => {
    removeItem()
  }, [removeItem])

  return { account, expired, remove }
}
