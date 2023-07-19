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
  properties: React.PropsWithChildren<MintModalLabelProperties>,
) {
  const { className, children, title, htmlFor } = properties
  return (
    <label
      className={cn(
        'mb-4 flex flex-row flex-nowrap items-center justify-between',
        className,
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
      'invalidWallet',
    ),
})

type MintNftFormData = z.infer<typeof mintNftSchema>

type MintModalProperties = ModalProperties & {
  nft: NFTItem | undefined
  onMintSubmit?: (data: MintNftFormData) => void
  onMintSuccess?: (hash?: `0x${string}`) => void
  onMintError?: (error: Error) => void
}

function MintModal(properties: MintModalProperties) {
  const { isOpen, nft, onModalClose, onMintSubmit, onMintSuccess } = properties

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
    inputAddress,
  )
  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => {
      console.debug(`Minted NFT with hash: ${data.transactionHash}`)
      onMintSuccess && onMintSuccess(data.transactionHash)
    },
  })

  const inputId = React.useId()
  const inputAddressId = React.useMemo(
    () => `inputAddress-${inputId}`,
    [inputId],
  )

  const errorMessage = React.useMemo<string | undefined>(() => {
    if (errors.inputAddress?.message) {
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
        return prepareError.cause.reason
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
    [onModalClose],
  )

  const handleMintModalSubmit = React.useCallback<
    SubmitHandler<MintNftFormData>
  >(
    async (data) => {
      if (!nft || !!errors.inputAddress || !writeAsync) return
      console.debug('handleMintModalSubmit', data)
      await writeAsync()
      onModalClose && onModalClose()
      onMintSubmit && onMintSubmit(data)
    },
    [errors.inputAddress, nft, onMintSubmit, onModalClose, writeAsync],
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

function ProcessingModal(properties: Omit<ModalProperties, 'title'>) {
  const t = useScopedI18n('overview.mintItMyNFT')
  const title = t('processingModalTitle')

  return (
    <Modal title={title} {...properties}>
      <div className="flex flex-col items-center justify-center">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-iff-purple text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">{title}</span>
      </div>
    </Modal>
  )
}

type MintResultModalProperties = CheckModalProperties & {
  hash?: `0x${string}`
}

function ResultModal(properties: MintResultModalProperties) {
  const { hash, isOpen, status, onModalClose } = properties
  const t = useScopedI18n('overview.mintItMyNFT')
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
            <p>{t('resultModalSuccess.p1')}</p>
            <p>{t('resultModalSuccess.p2')}</p>
          </React.Fragment>
        )}
        {status === 'error' && (
          <React.Fragment>
            <p>{t('resultModalError.p1')}</p>
            <p>{t('resultModalError.p2')}</p>
          </React.Fragment>
        )}
      </div>
      <div
        className={cn(
          'mt-10 flex flex-row items-center',
          status === 'success' && 'justify-between gap-2.5',
          status === 'error' && 'justify-center',
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
              {t('resultModalButton.another')}
            </Button>
            <Button
              className="border-2 border-[#14D6D6]"
              size="medium"
              shadow={false}
              onClick={handleOpenUrl}
            >
              {t('resultModalButton.check')}
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
            {t('resultModalButton.close')}
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

  const [isMintModalOpen, setIsMintModalOpen] = React.useState(false)
  const [selectedNft, setSelectedNft] = React.useState<NFTItem>()
  const handleMintModalOpen = React.useCallback((nft: NFTItem) => {
    setSelectedNft(nft)
    setIsMintModalOpen(true)
  }, [])
  const handleMintModalClose = React.useCallback(() => {
    setIsMintModalOpen(false)
  }, [])

  const [isProcessingModalOpen, setIsProcessingModalOpen] =
    React.useState(false)
  const handleMintSubmit = React.useCallback(() => {
    setIsProcessingModalOpen(true)
  }, [])

  const [resultModalStatus, setResultModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false)
  const handleResultModalClose = React.useCallback(() => {
    setIsResultModalOpen(false)
  }, [])

  const [mintHash, setMintHash] = React.useState<`0x${string}`>()
  const handleMintSuccess = React.useCallback(
    (hash?: `0x${string}` | undefined) => {
      setIsProcessingModalOpen(false)
      setResultModalStatus('success')
      setIsResultModalOpen(true)
      setMintHash(hash)
    },
    [],
  )

  return (
    <section className={cn('flex flex-col', className)}>
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={sortedNFTs.length}
      >
        {t('title')}
      </SectionTitle>
      {myNftsLoading && (
        <div className="flex justify-center">{t('loading')}</div>
      )}
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {sortedNFTs.map((nft, index) => (
          <NFTFrame
            key={`${nft.name}-${index}`}
            expired={false}
            hideTime={true}
            {...nft}
          >
            <NFTButton
              onClick={() => {
                handleMintModalOpen(nft)
              }}
            >
              {t('nftButton')}
            </NFTButton>
          </NFTFrame>
        ))}
      </div>
      <MintModal
        isOpen={isMintModalOpen}
        nft={selectedNft}
        onModalClose={handleMintModalClose}
        onMintSubmit={handleMintSubmit}
        onMintSuccess={handleMintSuccess}
      />
      <ProcessingModal isOpen={isProcessingModalOpen} />
      <ResultModal
        isOpen={isResultModalOpen}
        status={resultModalStatus}
        hash={mintHash}
        onModalClose={handleResultModalClose}
      />
    </section>
  )
}
