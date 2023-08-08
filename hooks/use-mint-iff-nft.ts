import React from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { IFFNFT } from '@/contracts/abi'
import type { NFTItem } from '@/types'

import { useIffNftAddress } from './use-iff-nft-address'

export function useMintIffNft(nft?: NFTItem, inputAddress?: `0x${string}`) {
  const address = useIffNftAddress()
  const { address: account } = useAccount()

  const mintArguments = React.useMemo<
    [`0x${string}`, `0x${string}`, number, string] | undefined
  >(() => {
    if (!inputAddress || !nft || !account) return
    const { address, tokenId } = nft
    return [inputAddress, address as `0x${string}`, tokenId, account]
  }, [account, inputAddress, nft])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    abi: IFFNFT,
    functionName: 'mintNFT',
    args: mintArguments,
    value: BigInt(0),
    enabled: Boolean(inputAddress),
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
