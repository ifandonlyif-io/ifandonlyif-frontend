import { Web3Provider } from '@ethersproject/providers'
import { IFFNFT__factory } from 'contracts'
import React from 'react'
import { getIffNftContractAddress } from 'utils'

export function useIffNftContract(provider: Web3Provider | null) {
  return React.useMemo(() => {
    const address = getIffNftContractAddress()
    if (!provider || !address) return null
    const signer = provider.getSigner()
    return IFFNFT__factory.connect(address, signer)
  }, [provider])
}
