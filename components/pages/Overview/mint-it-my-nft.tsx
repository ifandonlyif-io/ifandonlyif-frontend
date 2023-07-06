import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { ContractFunctionExecutionError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { Button, NFTButton } from '@/components/Buttons'
import { Input } from '@/components/Forms'
import { Modal, type ModalProperties } from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useMintIffNft } from '@/hooks'
import type { BaseComponent, MyNFTItem, NFTItem } from '@/types'
import {
  cn,
  sortNFTItems,
  validateAddressIsContract,
  validateStringIsAddress,
} from '@/utils'

import { SectionTitle } from './title'

type MintModalTitleProperties = BaseComponent & {
  title: string
  htmlFor: string
}

function MintModalTitle(
  properties: React.PropsWithChildren<MintModalTitleProperties>
) {
  const { className, children, title, htmlFor } = properties
  return (
    <label
      className={cn(
        'mb-4 flex flex-row flex-nowrap items-center justify-between',
        className
      )}
      htmlFor={htmlFor}
    >
      <h3 className="text-base font-bold text-iff-text">{title}&nbsp;-</h3>
      {children}
    </label>
  )
}

type MintModalErrorProperties = BaseComponent & {
  msg?: string[] | string | true
}

function MintModalError(properties: MintModalErrorProperties) {
  const { className, msg } = properties
  const { t } = useTranslation('overview')
  const message = React.useMemo<string>(() => {
    if (typeof msg === 'string') return msg
    if (Array.isArray(msg)) return msg.join(' ')
    return ''
  }, [msg])

  return (
    <React.Fragment>
      {msg && (
        <p className={cn('text-base font-bold text-red-500', className)}>
          {t(message)}
        </p>
      )}
    </React.Fragment>
  )
}

const mintNftSchema = z.object({
  inputAddress: z
    .string()
    .nonempty()
    .refine(validateStringIsAddress, 'invalidAddress')
    .refine(
      async (value) =>
        !(await validateAddressIsContract(value as `0x${string}`)),
      'invalidWallet'
    ),
})

type MintNftFormData = z.infer<typeof mintNftSchema>

type MintModalProperties = ModalProperties & {
  nft: NFTItem | undefined
}

function MintModal(properties: MintModalProperties) {
  const { isOpen, nft, onModalClose } = properties

  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItMyNFT.mintModal',
  })
  const { t: errorT } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage',
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MintNftFormData>({
    resolver: zodResolver(mintNftSchema),
  })
  const inputAddress = watch('inputAddress') as `0x${string}`

  const { data, writeAsync, isLoading, prepareError } = useMintIffNft(
    nft,
    inputAddress
  )
  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async (data) => {
      window?.alert?.(`Minted NFT with hash: ${data?.transactionHash}`)
    },
  })

  const inputId = React.useId()
  const inputAddressId = React.useMemo(
    () => `inputAddress-${inputId}`,
    [inputId]
  )

  const errorMessage = React.useMemo<string | undefined>(() => {
    if (errors?.inputAddress?.message) {
      const { message } = errors.inputAddress
      return errorT(message)
    }
    if (prepareError) {
      if (prepareError.message.includes('is invalid'))
        return errorT('invalidAddress')
      if (
        prepareError instanceof ContractFunctionExecutionError &&
        prepareError.cause &&
        typeof prepareError.cause === 'object' &&
        'reason' in prepareError.cause &&
        typeof prepareError.cause.reason === 'string'
      ) {
        return prepareError.cause?.reason
      }
      return prepareError.message
    }
    return
  }, [errorT, errors.inputAddress, prepareError])

  const handleCancelClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      onModalClose && onModalClose()
    },
    [onModalClose]
  )

  const handleMintModalSubmit = React.useCallback<
    SubmitHandler<MintNftFormData>
  >(
    async (data) => {
      if (!nft || errors.inputAddress || !writeAsync) return
      console.debug('handleMintModalSubmit', data)
      await writeAsync()
      onModalClose && onModalClose()
    },
    [errors.inputAddress, nft, onModalClose, writeAsync]
  )

  return (
    <Modal
      isOpen={isOpen && typeof nft === 'object'}
      onModalClose={onModalClose}
      title={t('heading', { nft }) ?? ''}
    >
      <form
        className="flex min-w-[390px] flex-col gap-4"
        onSubmit={handleSubmit(handleMintModalSubmit)}
      >
        <div className="flex flex-col">
          <MintModalTitle
            htmlFor={inputAddressId}
            title={t('mintModalTitle.inputAddress')}
          >
            {errorMessage && <MintModalError msg={errorMessage} />}
          </MintModalTitle>
          <Input
            id={inputAddressId}
            placeholder={t('input.placeholder.inputAddress') || undefined}
            {...register('inputAddress', { required: true })}
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2.5">
          <Button
            className="border-2 !bg-white"
            size="medium"
            shadow={false}
            onClick={handleCancelClick}
          >
            {t('button.cancel')}
          </Button>
          <Button
            className="border-2 border-[#14D6D6]"
            size="medium"
            shadow={false}
            type="submit"
            disabled={!writeAsync || isLoading}
          >
            {t('button.ok')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export type MintItMyNFTProperties = BaseComponent & {
  myNFTs: MyNFTItem[]
  myNftsLoading?: boolean
}

export function MintItMyNFT(properties: MintItMyNFTProperties) {
  const { myNFTs, myNftsLoading, className } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItMyNFT',
  })
  const sortedNFTs = sortNFTItems(myNFTs).reverse()

  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedNft, setSelectedNft] = React.useState<NFTItem>()
  const handleModalOpen = React.useCallback((nft: NFTItem) => {
    setSelectedNft(nft)
    setIsOpen(true)
  }, [])
  const handleModalClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <section className={cn('flex flex-col', className)}>
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={sortedNFTs.length}
      >
        {t('sectionTitle')}
      </SectionTitle>
      {myNftsLoading && <div className="flex justify-center">Loading...</div>}
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {sortedNFTs.map((nft, index) => (
          <NFTFrame
            key={`${nft.name}-${index}`}
            expired={false}
            hideTime={true}
            {...nft}
          >
            <NFTButton onClick={() => handleModalOpen(nft)}>
              {t('nftButton')}
            </NFTButton>
          </NFTFrame>
        ))}
      </div>
      <MintModal
        isOpen={isOpen}
        nft={selectedNft}
        onModalClose={handleModalClose}
      />
    </section>
  )
}
