import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useAccount, useSignMessage } from 'wagmi'

import { doWalletLogin, getSignatureCode } from '@/backend'
import { LSK_ACCESS_TOKEN, LSK_REFRESH_TOKEN } from '@/constants'
import type { UserInfo } from '@/types'
import { getAccessTokenPayload } from '@/utils'

// const defaultChainId = getDefaultChainId()

export function useIffAccount() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [accessToken, setAccessToken, { removeItem: removeAccessToken }] =
    useLocalStorageState<string>(LSK_ACCESS_TOKEN)
  const [refreshToken, setRefreshToken, { removeItem: removeRefreshToken }] =
    useLocalStorageState<string>(LSK_REFRESH_TOKEN)

  // TODO(550): Better way to check if user is logged in
  const hasToken = React.useMemo<boolean>(
    () => Boolean(accessToken || refreshToken),
    [accessToken, refreshToken]
  )

  const account = React.useMemo<UserInfo | undefined>(() => {
    if (!accessToken) return
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

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
    if (!address || account) return
    const { accessToken, refreshToken } = await getLoginToken(address)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }, [account, address, getLoginToken, setAccessToken, setRefreshToken])

  const signOut = React.useCallback(async () => {
    removeAccessToken()
    removeRefreshToken()
  }, [removeAccessToken, removeRefreshToken])

  return { hasToken, account, signIn, signOut }
}
