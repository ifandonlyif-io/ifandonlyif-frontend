import { useTranslation } from 'next-i18next'
import React from 'react'

import { Button, NFTButton } from '@/components/Buttons'
import { Input } from '@/components/Forms'
import { Modal, type ModalProperties } from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useMintIffNft } from '@/hooks'
import type { BaseComponent, MyNFTItem, NFTItem } from '@/types'
import { classNames, sortNFTItems } from '@/utils'

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
      className={classNames(
        'flex flex-row flex-nowrap justify-between items-center mb-4',
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
        <p
          className={classNames('text-base font-bold text-red-500', className)}
        >
          {t(message)}
        </p>
      )}
    </React.Fragment>
  )
}

type MintModalProperties = ModalProperties & {
  nft: NFTItem | undefined
}

function MintModal(properties: MintModalProperties) {
  const { isOpen, nft, onModalClose } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItMyNFT.mintModal',
  })

  const {
    writeAsync,
    isLoading,
    inputAddressError,
    handleInputAddressChange,
    userInfoError,
    handleUserInfoChange,
  } = useMintIffNft(nft)

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
    React.FormEventHandler<HTMLFormElement>
  >(
    async (event) => {
      if (!nft) return
      event.preventDefault()
      await writeAsync?.()
      onModalClose && onModalClose()
    },
    [nft, onModalClose, writeAsync]
  )

  return (
    <Modal
      isOpen={isOpen && typeof nft === 'object'}
      onModalClose={onModalClose}
      className="flex flex-col px-20 pb-9 pt-7"
      title={t('heading', { nft }) ?? ''}
    >
      <form
        className="flex min-w-[390px] flex-col gap-4"
        onSubmit={handleMintModalSubmit}
      >
        <div className="flex flex-col">
          <MintModalTitle
            htmlFor="inputAddress"
            title={t('mintModalTitle.inputAddress')}
          >
            {inputAddressError && <MintModalError msg={inputAddressError} />}
          </MintModalTitle>
          <Input
            id="inputAddress"
            placeholder={t('input.placeholder.inputAddress') || undefined}
            required={true}
            onChange={handleInputAddressChange}
          />
        </div>
        <div className="flex flex-col">
          <MintModalTitle
            htmlFor="userInfo"
            title={t('mintModalTitle.userInfo')}
          >
            {userInfoError && <MintModalError msg={userInfoError} />}
          </MintModalTitle>
          <Input
            id="userInfo"
            placeholder={t('input.placeholder.userInfo') || undefined}
            required={true}
            onChange={handleUserInfoChange}
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
