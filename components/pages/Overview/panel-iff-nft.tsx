import { useTranslation } from 'next-i18next'
import React from 'react'

import { Button, NFTButton } from '@/components/Buttons'
import { Radio, RadioGroup, Textarea } from '@/components/Forms'
import { Modal, type ModalProperties } from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useSortByTimezone } from '@/hooks'
import type { BaseComponent, NFTItem } from '@/types'
import { classNames, sortNFTItems } from '@/utils'

import { SectionTitleWithSortTimezone, TabTitle } from './title'

type MemoModalTitleProperties = BaseComponent & {
  title: string
  rightElement?: React.ReactNode
}

function MemoModalTitle(properties: MemoModalTitleProperties) {
  const { className, title, rightElement } = properties
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap justify-between items-center',
        className
      )}
    >
      <h3 className="text-base font-bold text-iff-text">{title}&nbsp;-</h3>
      {rightElement}
    </div>
  )
}

// type MemoModalInfoBarProps = BaseComponent

// function MemoModalInfoBar(props: MemoModalInfoBarProps) {
//   const { className } = props
//   return (
//     <div
//       className={classNames(
//         'flex flex-row flex-nowrap justify-between items-center',
//         'w-full h-[74px] px-6 bg-[#F0F0F0] rounded-[5px]',
//         'font-bold text-base text-iff-text',
//         className
//       )}
//     >
//       <p className="m-0">2022.5.10 10:20</p>
//       <p className="m-0">verified by IFANDONLYIF</p>
//     </div>
//   )
// }

type MemoModalProperties = ModalProperties

function MemoModal(properties: MemoModalProperties) {
  const { isOpen, onModalClose } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelIFFNFT.memoModal',
  })
  // const PoweredBy = () => (
  //   <p className="text-base font-medium text-iff-text">
  //     {t('poweredBy')}&nbsp;
  //     <span className="font-semibold text-[#14D6D6]">Meta.io</span>
  //   </p>
  // )
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
  const handleOkClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      onModalClose && onModalClose()
    },
    [onModalClose]
  )

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose}>
      <div className="flex flex-col px-20 pb-9 pt-7">
        <h2 className="mb-8 text-center text-2xl font-bold text-iff-text">
          {t('heading')}
        </h2>
        <form className="flex min-w-[390px] flex-col" action="#">
          <MemoModalTitle className="mb-4" title={t('memoModalTitle.memo')} />
          <RadioGroup className="mb-3" name="memo">
            <Radio value="yes">{t('radioGroup.yes')}</Radio>
            <Radio value="no">{t('radioGroup.no')}</Radio>
          </RadioGroup>
          <Textarea className="mb-8 h-[88px] w-full [resize:none]" />

          {/* <MemoModalTitle className="mb-4" title={t('memoModalTitle.info')} />
          <RadioGroup className="mb-3" name="info">
            <Radio value="yes">{t('radioGroup.yes')}</Radio>
            <Radio value="no">{t('radioGroup.no')}</Radio>
          </RadioGroup>
          <MemoModalInfoBar className="mb-8" />

          <MemoModalTitle
            className="mb-4"
            title={t('memoModalTitle.chain')}
            rightElement={<PoweredBy />}
          />
          <RadioGroup className="mb-3" name="chain">
            <Radio value="yes">{t('radioGroup.yes')}</Radio>
            <Radio value="no">{t('radioGroup.no')}</Radio>
          </RadioGroup> */}

          <div className="mt-16 grid grid-cols-2 gap-[10px]">
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
              onClick={handleOkClick}
            >
              {t('button.ok')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

type NFTButtonsProperties = {
  onMemoClick: () => void
}

function NFTButtons(properties: NFTButtonsProperties) {
  const { onMemoClick } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelIFFNFT.nftButtons',
  })

  return (
    <div className="flex flex-1 flex-row flex-nowrap items-center justify-between">
      <NFTButton
        className="!border-[#A585FF] !text-[#A585FF]"
        size="small"
        outline
      >
        {t('view')}
      </NFTButton>
      <NFTButton className="!text-[#CBB9FF]" size="small" onClick={onMemoClick}>
        {t('memo')}
      </NFTButton>
    </div>
  )
}

export type PanelIFFNFTProperties = {
  myIFFNFT: NFTItem[]
}

export function PanelIFFNFT(properties: PanelIFFNFTProperties) {
  const { myIFFNFT } = properties
  const sortedNFTs = sortNFTItems(myIFFNFT).reverse()
  const { t } = useTranslation('overview')
  const timezone = useSortByTimezone()
  const [isOpen, setIsOpen] = React.useState(false)
  const handleModalOpen = React.useCallback(() => setIsOpen(true), [])
  const handleModalClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <div className="min-h-[640px] px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-4">{t('overview.panelIFFNFT.tabTitle')}</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="mb-4 flex flex-col md:mb-8">
        <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
          {sortedNFTs.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              expired={false}
              zone={timezone.value}
              {...nft}
            >
              <NFTButtons onMemoClick={handleModalOpen} />
            </NFTFrame>
          ))}
        </div>
      </section>
      <MemoModal isOpen={isOpen} onModalClose={handleModalClose} />
    </div>
  )
}
