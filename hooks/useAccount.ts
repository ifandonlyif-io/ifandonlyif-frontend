import { Web3Provider } from '@ethersproject/providers'
import type { ConnectOptions } from '@web3-onboard/core'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { doWalletLogin, getSignatureCode } from 'backend'
import { LSK_ACCESS_TOKEN, LSK_PREV_WALLET, ZERO_BIG_NUMBER } from 'constants/'
import { BigNumber, ethers } from 'ethers'
import { getAddress, isAddress, parseEther } from 'ethers/lib/utils'
import React from 'react'
import { AccountAccessTokenJWTPayload, PreviouslyConnectedWallet } from 'types'
import useLocalStorageState from 'use-local-storage-state'
import { getAccessTokenPayload, isAccountTokenExpired } from 'utils'

export function useWeb3Account() {
  const [{ wallet }, connectWallet, disconnectWallet] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const [prevWallet, setPrevWalet] =
    useLocalStorageState<PreviouslyConnectedWallet>(LSK_PREV_WALLET)

  const account = React.useMemo<string | null>(() => {
    if (!wallet) return null
    if (!Array.isArray(wallet.accounts) || wallet.accounts.length === 0)
      return null
    const account = wallet.accounts[0].address
    if (!isAddress(account)) return null
    return getAddress(account)
  }, [wallet])

  const accountMismatch = React.useMemo<boolean>(() => {
    if (!account || !prevWallet) return true
    return account !== prevWallet.account
  }, [account, prevWallet])

  const balance = React.useMemo<BigNumber>(() => {
    if (!wallet) return ZERO_BIG_NUMBER
    if (!Array.isArray(wallet.accounts) || wallet.accounts.length === 0)
      return ZERO_BIG_NUMBER
    const balances = wallet.accounts[0].balance
    const ethBalance = balances && balances['ETH']
    if (!ethBalance) return ZERO_BIG_NUMBER
    return parseEther(ethBalance)
  }, [wallet])

  const provider = React.useMemo<Web3Provider | null>(() => {
    if (!wallet) return null
    return new ethers.providers.Web3Provider(wallet.provider)
  }, [wallet])

  const _connect = React.useCallback(
    async (options?: ConnectOptions) => {
      const state = await connectWallet(options)
      return state[0]
    },
    [connectWallet]
  )

  const switchNetwork = React.useCallback(
    async (chainId: string) => {
      if (connectedChain && connectedChain.id === chainId) return true
      return await setChain({ chainId })
    },
    [connectedChain, setChain]
  )

  const connect = React.useCallback(async () => {
    if (wallet) {
      const account = getAddress(wallet.accounts[0].address)
      setPrevWalet({ label: wallet.label, account })
      return wallet
    }

    const state = await _connect()
    const chainState = await switchNetwork('0x1')
    if (!chainState) return null
    const account = getAddress(state.accounts[0].address)
    setPrevWalet({ label: state.label, account })
    return state
  }, [_connect, setPrevWalet, switchNetwork, wallet])

  const disconnect = React.useCallback(async () => {
    if (wallet) await disconnectWallet(wallet)
  }, [disconnectWallet, wallet])

  const resumeWalletConnection = React.useCallback(async () => {
    if (!prevWallet) return null
    const { label } = prevWallet
    const state = await _connect({ autoSelect: { label, disableModals: true } })
    const account = getAddress(state.accounts[0].address)
    console.debug('resumeWalletConnection', label, account)
    setPrevWalet({ label, account })
    return state
  }, [_connect, prevWallet, setPrevWalet])

  React.useEffect(() => {
    const notConnected = !wallet && prevWallet
    if (notConnected) resumeWalletConnection().then()
  }, [prevWallet, resumeWalletConnection, wallet])

  return {
    account,
    accountMismatch,
    balance,
    connectedChain,
    wallet,
    provider,
    connect,
    disconnect,
    switchNetwork,
  }
}

export function useIffAccount() {
  const {
    account: walletAccount,
    accountMismatch: walletMismatch,
    connect,
    disconnect,
  } = useWeb3Account()
  const [accessToken, setAccessToken, { removeItem }] =
    useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const account = React.useMemo<AccountAccessTokenJWTPayload | null>(() => {
    if (!accessToken) return null
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

  const accountMismatch = React.useMemo<boolean>(() => {
    if (walletMismatch || !account) return true
    return account.wallet !== walletAccount
  }, [account, walletAccount, walletMismatch])

  const expired = React.useMemo<boolean>(() => {
    if (!accessToken) return true
    return isAccountTokenExpired(accessToken)
  }, [accessToken])

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

  const getAccessToken = React.useCallback(
    async (account: string, provider: Web3Provider) => {
      const code = await getWalletSignCode(account)
      if (!code) throw new Error('No signature code')
      const sig = await getWalletSignSignature(code, provider)
      if (!sig) throw new Error('No sign signature')
      const { accessToken } = await doWalletLogin(account, sig)
      return accessToken
    },
    [getWalletSignCode, getWalletSignSignature]
  )

  const connectWallet = React.useCallback(async () => {
    const state = await connect()
    if (!state) return null
    const account = getAddress(state.accounts[0].address)
    const provider = new ethers.providers.Web3Provider(state.provider)
    return { account, provider }
  }, [connect])

  const signIn = React.useCallback(async () => {
    const wallet = await connectWallet()
    if (!wallet) return
    const { account, provider } = wallet
    const accessToken = await getAccessToken(account, provider)
    setAccessToken(accessToken)
    console.debug('signIn', account)
  }, [connectWallet, getAccessToken, setAccessToken])

  const signOut = React.useCallback(async () => {
    removeItem()
    await disconnect()
  }, [disconnect, removeItem])

  return { account, accountMismatch, expired, signIn, signOut }
}
