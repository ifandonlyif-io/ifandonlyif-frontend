import { Web3Provider } from '@ethersproject/providers'
import React from 'react'

import { IFFNFT__factory } from '@/contracts'
import { getIffNftContractAddress } from '@/utils'

export function useIffNftContract(provider: Web3Provider | undefined) {
  return React.useMemo(() => {
    const address = getIffNftContractAddress()
    if (!provider || !address) return
    const signer = provider.getSigner()
    return IFFNFT__factory.connect(address, signer)
  }, [provider])
}
