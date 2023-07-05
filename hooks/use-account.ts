import React from 'react'
import { getAddress } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'

import { doWalletLogin, getSignatureCode } from '@/backend'
import type { UserInfo } from '@/types'
import { getAccessTokenPayload } from '@/utils'

import { useTokenStorage } from './use-token-storage'

export function useIffAccount() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const {
    accessToken,
    setAccessToken,
    removeAccessToken,
    setRefreshToken,
    removeRefreshToken,
  } = useTokenStorage()

  const account = React.useMemo<UserInfo | undefined>(() => {
    if (!accessToken) return
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

  const isAccountMissMatch = React.useMemo<boolean>(() => {
    if (!account) return true
    const wallet = getAddress(account.wallet)
    const current = address ? getAddress(address.toString()) : undefined
    console.debug('useIffAccount::isAccountMissMatch', wallet, current)
    return wallet !== current
  }, [account, address])

  const getWalletSignCode = React.useCallback(async (address: string) => {
    if (!address) return
    const { code } = await getSignatureCode(address)
    if (code) return code
    return
  }, [])

  const getWalletSignSignature = React.useCallback(
    async (code: string) => {
      if (!code) return
      const signature = await signMessageAsync({ message: code })
      return signature
    },
    [signMessageAsync]
  )

  const getLoginToken = React.useCallback(
    async (address: string) => {
      const code = await getWalletSignCode(address)
      if (!code) throw new Error('No signature code')
      const signature = await getWalletSignSignature(code)
      if (!signature) throw new Error('No sign signature')
      console.debug('address', address, 'signature', signature)
      return await doWalletLogin(address, signature)
    },
    [getWalletSignCode, getWalletSignSignature]
  )

  const signIn = React.useCallback(async () => {
    if (!address) return
    const { accessToken, refreshToken } = await getLoginToken(address)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }, [address, getLoginToken, setAccessToken, setRefreshToken])

  const signOut = React.useCallback(async () => {
    removeAccessToken()
    removeRefreshToken()
  }, [removeAccessToken, removeRefreshToken])

  return { account, isAccountMissMatch, signIn, signOut }
}
