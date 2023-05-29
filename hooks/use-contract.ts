import React from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { IFFNFT } from '@/contracts/abi'
import { getIffNftContractAddress } from '@/utils'

export function useMintIffNft(
  inputAddress: `0x${string}`,
  typeId: number,
  userInfo: string
) {
  const address = React.useMemo(() => getIffNftContractAddress(), [])
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    abi: IFFNFT,
    functionName: 'mintNFT',
    args: [inputAddress, typeId, userInfo],
    value: BigInt(0),
  })
  const { data, error, isError, writeAsync } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

  return {
    data,
    writeAsync,
    isLoading,
    isSuccess,
    isError,
    isPrepareError,
    error,
    prepareError,
  }
}
