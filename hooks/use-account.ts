import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useAccount, useSignMessage } from 'wagmi'

import { doWalletLogin, getSignatureCode } from '@/backend'
import { LSK_ACCESS_TOKEN } from '@/constants'
import type { AccountAccessTokenJWTPayload } from '@/types'
import {
  getAccessTokenPayload,
  // getDefaultChainId,
  isAccountTokenExpired,
} from '@/utils'

// const defaultChainId = getDefaultChainId()

export function useIffAccount() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [accessToken, setAccessToken, { removeItem }] =
    useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const account = React.useMemo<
    AccountAccessTokenJWTPayload | undefined
  >(() => {
    if (!accessToken) return
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

  const expired = React.useMemo<boolean>(() => {
    if (!accessToken) return true
    return isAccountTokenExpired(accessToken)
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

  const getAccessToken = React.useCallback(
    async (address: string) => {
      const code = await getWalletSignCode(address)
      if (!code) throw new Error('No signature code')
      const signature = await getWalletSignSignature(code)
      if (!signature) throw new Error('No sign signature')
      console.debug('address', address, 'signature', signature)
      const { accessToken } = await doWalletLogin(address, signature)
      return accessToken
    },
    [getWalletSignCode, getWalletSignSignature]
  )

  const signIn = React.useCallback(async () => {
    if (!address) return
    if (expired) {
      const accessToken = await getAccessToken(address)
      setAccessToken(accessToken)
    }
  }, [address, expired, getAccessToken, setAccessToken])

  const signOut = React.useCallback(async () => {
    removeItem()
  }, [removeItem])

  return { account, address, expired, signIn, signOut }
}
