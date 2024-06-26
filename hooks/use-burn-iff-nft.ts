import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { IFFNFT } from '@/contracts/abi'

import { useIffNftAddress } from './use-iff-nft-address'

export function useBurnIffNft(tokenId?: number | string) {
  const address = useIffNftAddress()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    abi: IFFNFT,
    functionName: 'BurnNFT',
    args: tokenId ? [BigInt(tokenId)] : undefined,
    enabled: !!tokenId,
  })

  const {
    data,
    error: writeError,
    isError: isWriteError,
    isLoading,
    writeAsync,
  } = useContractWrite(config)

  return {
    data,
    writeAsync,
    isLoading,
    isPrepareError,
    prepareError,
    isWriteError,
    writeError,
  }
}
