import { Web3Provider } from '@ethersproject/providers'
import { IFFNFT__factory } from 'contracts'
import React from 'react'

export function useIffNftContract(
  provider: Web3Provider | null,
  address: string
) {
  return React.useMemo(() => {
    if (!provider || !address) return null
    return IFFNFT__factory.connect(address, provider)
  }, [address, provider])
}
