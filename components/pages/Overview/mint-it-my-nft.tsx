import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { ContractFunctionExecutionError } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import { Button, NFTButton } from '@/components/Buttons'
import { Input } from '@/components/Forms'
import {
  CheckModal,
  type CheckModalProperties,
  Modal,
  type ModalProperties,
} from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useMintIffNft } from '@/hooks'
import { useChainExplorer } from '@/hooks/use-chain-explorer'
import { useScopedI18n } from '@/locales'
import type { BaseComponent, MyNFTItem, NFTItem } from '@/types'
import {
  cn,
  sortNFTItems,
  validateAddressIsContract,
  validateStringIsAddress,
} from '@/utils'

import { SectionTitle } from './title'

type MintModalLabelProperties = BaseComponent & {
  title: string
  htmlFor: string
}

function MintModalLabel(
  properties: React.PropsWithChildren<MintModalLabelProperties>
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

type ErrorMessage =
  | 'required'
  | 'invalidAddress'
  | 'invalidWallet'
  | 'notOwnAddress'
  | 'invalidTypeId'
type MintModalErrorProperties = BaseComponent & {
  msg?: string[] | string | true
}

function MintModalError(properties: MintModalErrorProperties) {
  const { className, msg } = properties
  const t = useScopedI18n('overview.mintItMyNFT.mintModalMessage')
  const message = React.useMemo<ErrorMessage>(() => {
    if (typeof msg === 'string') return msg as ErrorMessage
    if (Array.isArray(msg)) return msg.join(' ') as ErrorMessage
    return 'required'
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
  onMintSuccess?: (hash?: `0x${string}`) => void
  onMintError?: (error: Error) => void
}

function MintModal(properties: MintModalProperties) {
  const { isOpen, nft, onModalClose, onMintSuccess } = properties

  const t = useScopedI18n('overview.mintItMyNFT')
  const errorT = useScopedI18n('overview.mintItMyNFT.mintModalMessage')

  const modalTitle = React.useMemo<string>(() => {
    if (!nft) return ''
    return t('mintModalTitle', { name: nft.name, tokenId: nft.tokenId })
  }, [nft, t])

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
      console.debug(`Minted NFT with hash: ${data?.transactionHash}`)
      onMintSuccess && onMintSuccess(data?.transactionHash)
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
      return errorT(message as ErrorMessage)
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
      title={modalTitle}
    >
      <form
        className="flex min-w-[390px] flex-col gap-4"
        onSubmit={handleSubmit(handleMintModalSubmit)}
      >
        <div className="flex flex-col">
          <MintModalLabel
            htmlFor={inputAddressId}
            title={t('mintModalLabel.inputAddress')}
          >
            {errorMessage && <MintModalError msg={errorMessage} />}
          </MintModalLabel>
          <Input
            id={inputAddressId}
            placeholder={t('mintModalInput.inputAddress') || undefined}
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
            {t('mintModalButton.cancel')}
          </Button>
          <Button
            className="border-2 border-[#14D6D6]"
            size="medium"
            shadow={false}
            type="submit"
            disabled={!writeAsync || isLoading}
          >
            {t('mintModalButton.ok')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

type MintResultModalProperties = CheckModalProperties & {
  hash?: `0x${string}`
}

function MintResultModal(properties: MintResultModalProperties) {
  const { hash, isOpen, status, onModalClose } = properties
  const explorerUrl = useChainExplorer(hash)
  const handleOpenUrl = React.useCallback(() => {
    if (!explorerUrl) return
    window.open(explorerUrl, '_blank')
  }, [explorerUrl])

  return (
    <CheckModal isOpen={isOpen} status={status} onModalClose={onModalClose}>
      <div className="mt-10 text-center text-base font-bold text-iff-text">
        {status === 'success' && (
          <React.Fragment>
            <p>You just had minted NFT successfully.</p>
            <p>Now you can go to check it or mint another one.</p>
          </React.Fragment>
        )}
        {status === 'error' && (
          <React.Fragment>
            <p>Sorry! Something go wrong....</p>
            <p>Maybe your can try it again.</p>
          </React.Fragment>
        )}
      </div>
      <div
        className={cn(
          'mt-10 flex flex-row items-center',
          status === 'success' && 'justify-between gap-2.5',
          status === 'error' && 'justify-center'
        )}
      >
        {status === 'success' && (
          <React.Fragment>
            <Button
              className="border-2 !bg-white"
              size="medium"
              shadow={false}
              onClick={onModalClose}
            >
              Mint another
            </Button>
            <Button
              className="border-2 border-[#14D6D6]"
              size="medium"
              shadow={false}
              onClick={handleOpenUrl}
            >
              Check it
            </Button>
          </React.Fragment>
        )}
        {status === 'error' && (
          <Button
            className="max-w-[190px] border-2 border-[#14D6D6]"
            size="medium"
            shadow={false}
            onClick={onModalClose}
          >
            Close
          </Button>
        )}
      </div>
    </CheckModal>
  )
}

export type MintItMyNFTProperties = BaseComponent & {
  myNFTs: MyNFTItem[]
  myNftsLoading?: boolean
}

export function MintItMyNFT(properties: MintItMyNFTProperties) {
  const { myNFTs, myNftsLoading, className } = properties
  const t = useScopedI18n('overview.mintItMyNFT')
  const sortedNFTs = sortNFTItems(myNFTs).reverse()

  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedNft, setSelectedNft] = React.useState<NFTItem>()
  const handleModalOpen = React.useCallback((nft: NFTItem) => {
    setSelectedNft(nft)
    setIsOpen(true)
  }, [])
  const handleModalClose = React.useCallback(() => setIsOpen(false), [])

  const [mintResultModalStatus, setMintResultModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [mintResultModalOpen, setMintResultModalOpen] = React.useState(false)
  const handleMintResultModalClose = React.useCallback(
    () => setMintResultModalOpen(false),
    []
  )

  const [mintHash, setMintHash] = React.useState<`0x${string}`>()
  const handleMintSuccess = React.useCallback<
    MintModalProperties['onMintSuccess']
  >((hash) => {
    setMintResultModalStatus('success')
    setMintResultModalOpen(true)
    setMintHash(hash)
  }, [])

  return (
    <section className={cn('flex flex-col', className)}>
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={sortedNFTs.length}
      >
        {t('title')}
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
        onMintSuccess={handleMintSuccess}
      />
      <MintResultModal
        isOpen={mintResultModalOpen}
        status={mintResultModalStatus}
        hash={mintHash}
        onModalClose={handleMintResultModalClose}
      />
    </section>
  )
}
