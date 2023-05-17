import { useTranslation } from 'next-i18next'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'

import { Button, NFTButton } from '@/components/Buttons'
import { Input } from '@/components/Forms'
import { Modal, type ModalProperties } from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useMintIffNft } from '@/hooks'
import type {
  BaseComponent,
  MintIffNftFormData,
  MyNFTItem,
  NFTItem,
} from '@/types'
import {
  classNames,
  getIffNftTypeId,
  sortNFTItems,
  validateMintIffNftFormInputAddress,
  validateMintIffNftFormUserInfo,
} from '@/utils'

import { SectionTitle } from './title'

type MintModalTitleProperties = BaseComponent & { title: string }

function MintModalTitle(
  properties: React.PropsWithChildren<MintModalTitleProperties>
) {
  const { className, children, title } = properties
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap justify-between items-center mb-4',
        className
      )}
    >
      <h3 className="text-base font-bold text-iff-text">{title}&nbsp;-</h3>
      {children}
    </div>
  )
}

type MintModalErrorProperties = BaseComponent & { msg?: string }

function MintModalError(properties: MintModalErrorProperties) {
  const { className, msg } = properties
  const { t } = useTranslation('overview')
  // eslint-disable-next-line unicorn/no-null
  if (!msg) return null
  return (
    <p className={classNames('text-base font-bold text-red-500', className)}>
      {t(msg)}
    </p>
  )
}

type MintModalProperties = ModalProperties & {
  nft: NFTItem | undefined
}

function MintModal(properties: MintModalProperties) {
  const { isOpen, nft, onModalClose } = properties
  const { address } = useAccount()
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItMyNFT.mintModal',
  })
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<MintIffNftFormData>()
  const typeId = React.useMemo(
    () => getIffNftTypeId(nft?.name || '') ?? -1,
    [nft]
  )
  const inputAddress = watch('inputAddress')
  const userInfo = watch('userInfo')

  const { writeAsync } = useMintIffNft(inputAddress, typeId, userInfo)

  const required = t('input.errorMessage.required') || true

  const handleCancelClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      onModalClose && onModalClose()
    },
    [onModalClose]
  )

  const handleMintModalSubmit = React.useCallback<
    SubmitHandler<MintIffNftFormData>
  >(
    async (data) => {
      if (!nft) return
      console.debug('handleMintModalSubmit', data)
      await writeAsync?.()
      onModalClose && onModalClose()
    },
    [nft, onModalClose, writeAsync]
  )

  return (
    <Modal
      isOpen={isOpen && typeof nft === 'object'}
      onModalClose={onModalClose}
    >
      <div className="flex flex-col px-20 pb-9 pt-7">
        <h2 className="mb-8 text-center text-2xl font-bold text-iff-text">
          {t('heading', { nft })}
        </h2>
        <form
          className="flex min-w-[390px] flex-col gap-4"
          onSubmit={handleSubmit(handleMintModalSubmit)}
        >
          <div className="flex flex-col">
            <MintModalTitle title={t('mintModalTitle.inputAddress')}>
              <MintModalError msg={errors.inputAddress?.message} />
            </MintModalTitle>
            <Input
              placeholder={t('input.placeholder.inputAddress') || undefined}
              {...register('inputAddress', {
                required,
                validate: (value) =>
                  validateMintIffNftFormInputAddress(value, address),
              })}
            />
          </div>
          <div className="flex flex-col">
            <MintModalTitle title={t('mintModalTitle.userInfo')}>
              <MintModalError msg={errors.userInfo?.message} />
            </MintModalTitle>
            <Input
              placeholder={t('input.placeholder.userInfo') || undefined}
              {...register('userInfo', {
                required,
                validate: validateMintIffNftFormUserInfo,
              })}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-[10px]">
            <Button
              className="border-[2px] !bg-white"
              size="medium"
              shadow={false}
              onClick={handleCancelClick}
            >
              {t('button.cancel')}
            </Button>
            <Button
              className="border-[2px] border-[#14D6D6]"
              size="medium"
              shadow={false}
              type="submit"
            >
              {t('button.ok')}
            </Button>
          </div>
        </form>
      </div>
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
    <section className={classNames('flex flex-col', className)}>
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
