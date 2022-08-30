import { useWeb3React } from '@web3-react/core'
import { getSignatureCode } from 'backend'
import React from 'react'

type UseMetamaskAccount = {
  walletLogin: () => Promise<void>
}

export function useMetamaskAccount(): UseMetamaskAccount {
  const { account, provider } = useWeb3React()

  const getMetamaskSignCode = React.useCallback(async () => {
    if (!account) return null
    const res = await getSignatureCode(account)
    if (res.code) return res.code
    return null
  }, [account])

  const getMetamaskSignSignature = React.useCallback(async (code: string) => {
    if (!(account && provider)) return null
    const signer = provider.getSigner()
    const signature = await signer.signMessage(code)
    console.debug('account', account, 'signature', signature)
    return signature
  }, [])

  const walletLogin = React.useCallback<
    UseMetamaskAccount['walletLogin']
  >(async () => {
    if (!account) throw new Error('No wallet address')

    const code = await getMetamaskSignCode()
    if (!code) throw new Error('No signature code')

    const sig = await getMetamaskSignSignature(code)
    if (!sig) throw new Error('No sign signature')

    try {
      // TODO: Login api
    } catch (error) {
      // TODO: handle possible error
      console.error('Wallet login error', error)
    }
  }, [])

  return { walletLogin }
}
