import { Web3Provider } from '@ethersproject/providers'
import type { ConnectOptions } from '@web3-onboard/core'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { doWalletLogin, getSignatureCode } from 'backend'
import { LSK_ACCESS_TOKEN, LSK_PREV_WALLET } from 'constants/'
import { ethers } from 'ethers'
import { getAddress, isAddress } from 'ethers/lib/utils'
import React from 'react'
import { AccountAccessTokenJWTPayload, PreviouslyConnectedWallet } from 'types'
import useLocalStorageState from 'use-local-storage-state'
import { getAccessTokenPayload, isAccountTokenExpired } from 'utils'

export function useWeb3Account() {
  const [{ wallet }, connectWallet, disconnectWallet] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()

  const account = React.useMemo<string | null>(() => {
    if (!wallet) return null
    if (!Array.isArray(wallet.accounts) || wallet.accounts.length === 0)
      return null
    const account = wallet.accounts[0].address
    if (!isAddress(account)) return null
    return getAddress(account)
  }, [wallet])

  const provider = React.useMemo<Web3Provider | null>(() => {
    if (!wallet) return null
    return new ethers.providers.Web3Provider(wallet.provider)
  }, [wallet])

  const connect = React.useCallback(
    async (options?: ConnectOptions) => {
      const state = await connectWallet(options)
      return state[0]
    },
    [connectWallet]
  )

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
  const { account: currentAccount, connect, switchNetwork } = useWeb3Account()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)
  const [prevWallet, setPrevWalet] =
    useLocalStorageState<PreviouslyConnectedWallet>(LSK_PREV_WALLET)

  const resumeWalletConnection = React.useCallback(async () => {
    if (!prevWallet) return null
    const { label, account } = prevWallet
    const wallet = await connect({
      autoSelect: { label, disableModals: true },
    })
    console.debug('resumeWalletConnection', label, account)
    return wallet
  }, [connect, prevWallet])

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
    const state = await connect()
    const chainState = await switchNetwork('0x1')
    if (!chainState) return
    const account = getAddress(state.accounts[0].address)
    const provider = new ethers.providers.Web3Provider(state.provider)
    const code = await getWalletSignCode(account)
    if (!code) throw new Error('No signature code')
    const sig = await getWalletSignSignature(code, provider)
    if (!sig) throw new Error('No sign signature')
    const { accessToken } = await doWalletLogin(account, sig)
    setAccessToken(accessToken)
    setPrevWalet({ label: state.label, account })
  }, [
    connect,
    getWalletSignCode,
    getWalletSignSignature,
    setAccessToken,
    setPrevWalet,
    switchNetwork,
  ])

  React.useEffect(() => {
    if (!currentAccount && prevWallet) resumeWalletConnection().then()
  }, [currentAccount, prevWallet, resumeWalletConnection])

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
