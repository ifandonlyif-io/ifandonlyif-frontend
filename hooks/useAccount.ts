import { useWeb3React } from '@web3-react/core'
import { doWalletLogin, getSignatureCode } from 'backend'
import { LSK_ACCESS_TOKEN } from 'constants/'
import React from 'react'
import { AccountAccessTokenJWTPayload } from 'types'
import useLocalStorageState from 'use-local-storage-state'
import { getAccessTokenPayload, isAccountTokenExpired } from 'utils'

type UseMetamaskAccount = {
  walletLogin: () => Promise<void>
}

export function useMetamaskAccount(): UseMetamaskAccount {
  const sendingRef = React.useRef<boolean>(false)

  const { account, provider } = useWeb3React()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const getMetamaskSignCode = React.useCallback(async () => {
    if (!account) return null
    const res = await getSignatureCode(account)
    if (res.code) return res.code
    return null
  }, [account])

  const getMetamaskSignSignature = React.useCallback(
    async (code: string) => {
      if (!(account && provider)) return null
      const signer = provider.getSigner()
      const signature = await signer.signMessage(code)
      console.debug('account', account, 'signature', signature)
      return signature
    },
    [account, provider]
  )

  const walletLogin = React.useCallback<
    UseMetamaskAccount['walletLogin']
  >(async () => {
    if (sendingRef.current) return
    sendingRef.current = true

    if (!account) throw new Error('No wallet address')

    const code = await getMetamaskSignCode()
    if (!code) throw new Error('No signature code')

    const sig = await getMetamaskSignSignature(code)
    if (!sig) throw new Error('No sign signature')

    try {
      const { accessToken } = await doWalletLogin(account, sig)
      setAccessToken(accessToken)
    } catch (error) {
      // TODO: handle possible error
      console.error('Wallet login error', error)
    } finally {
      sendingRef.current = false
    }
  }, [account, getMetamaskSignCode, getMetamaskSignSignature, setAccessToken])

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
