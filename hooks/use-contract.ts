import React from 'react'
import type { ValidateResult } from 'react-hook-form'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { IFFNFT } from '@/contracts/abi'
import type { NFTItem } from '@/types'
import {
  getIffNftContractAddress,
  getIffNftTypeId,
  validateMintIffNftFormInputAddress,
  validateMintIffNftFormUserInfo,
} from '@/utils'

export function useMintIffNft(nft?: NFTItem) {
  const { address: account } = useAccount()

  const [inputAddress, setInputAddress] = React.useState<`0x${string}`>('0x')
  const [inputAddressError, setInputAddressError] =
    React.useState<ValidateResult>()
  const handleInputAddressChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    async (event) => {
      const value = event.target.value as `0x${string}`
      const result = await validateMintIffNftFormInputAddress(value, account)
      if (typeof result !== 'boolean' || result !== true)
        return setInputAddressError(result)
      setInputAddress(value)
      setInputAddressError('')
    },
    [account]
  )

  const [userInfo, setUserInfo] = React.useState<string>('')
  const [userInfoError, setUserInfoError] = React.useState<ValidateResult>()
  const handleUserInfoChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(async (event) => {
    const value = event.target.value as `0x${string}`
    const result = await validateMintIffNftFormUserInfo(value)
    if (typeof result !== 'boolean' || result !== true)
      return setUserInfoError(result)
    setUserInfo(value)
    setUserInfoError('')
  }, [])

  const address = React.useMemo(() => getIffNftContractAddress(), [])
  const typeId = React.useMemo(
    () => getIffNftTypeId(nft?.name || '') ?? -1,
    [nft]
  )

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
    enabled: Boolean(inputAddress),
  })
  const {
    data,
    error: writeError,
    isError: isWriteError,
    isLoading,
    writeAsync,
  } = useContractWrite(config)
  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async (data) => {
      // TODO: move outside
      window?.alert?.(`Minted NFT with hash: ${data?.transactionHash}`)
    },
  })

  return {
    writeAsync,
    isLoading,
    isPrepareError,
    prepareError,
    isWriteError,
    writeError,
    inputAddressError,
    handleInputAddressChange,
    userInfoError,
    handleUserInfoChange,
  }
}
