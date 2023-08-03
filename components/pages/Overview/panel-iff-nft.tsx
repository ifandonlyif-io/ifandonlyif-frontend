import React from 'react'

import { Button, NFTButton } from '@/components/Buttons'
import { Radio, RadioGroup, Textarea } from '@/components/Forms'
import { Modal, type ModalProperties } from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import { useSortByTimezone } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { BaseComponent, NFTItem } from '@/types'
import { cn, sortNFTItems } from '@/utils'

import { SectionTitleWithSortTimezone, TabTitle } from './title'

type MemoModalLabelProperties = BaseComponent & {
  title: string
  rightElement?: React.ReactNode
}

function MemoModalLabel(properties: MemoModalLabelProperties) {
  const { className, title, rightElement } = properties
  return (
    <div
      className={cn(
        'flex flex-row flex-nowrap items-center justify-between',
        className,
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
  const t = useScopedI18n('overview.iffNFTMyNFT')
  // const PoweredBy = () => (
  //   <p className="text-base font-medium text-iff-text">
  //     {t('memoModalPoweredBy')}&nbsp;
  //     <span className="font-semibold text-iff-cyan-dark">Meta.io</span>
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
    [onModalClose],
  )
  const handleOkClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      onModalClose && onModalClose()
    },
    [onModalClose],
  )

  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose}>
      <div className="flex flex-col px-20 pb-9 pt-7">
        <h2 className="mb-8 text-center text-2xl font-bold text-iff-text">
          {t('memoModalTitle')}
        </h2>
        <form className="flex min-w-[390px] flex-col" action="#">
          <MemoModalLabel className="mb-4" title={t('memoModalLabel.memo')} />
          <RadioGroup className="mb-3" name="memo">
            <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
            <Radio value="no">{t('memoModalRadio.no')}</Radio>
          </RadioGroup>
          <Textarea className="mb-8 h-[88px] w-full [resize:none]" />

          {/* <MemoModalLabel className="mb-4" title={t('memoModalLabel.info')} />
          <RadioGroup className="mb-3" name="info">
            <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
            <Radio value="no">{t('memoModalRadio.no')}</Radio>
          </RadioGroup>
          <MemoModalInfoBar className="mb-8" />

          <MemoModalLabel
            className="mb-4"
            title={t('memoModalLabel.chain')}
            rightElement={<PoweredBy />}
          />
          <RadioGroup className="mb-3" name="chain">
            <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
            <Radio value="no">{t('memoModalRadio.no')}</Radio>
          </RadioGroup> */}

          <div className="mt-16 grid grid-cols-2 gap-2.5">
            <Button
              className="border-2 !bg-white"
              size="medium"
              shadow={false}
              onClick={handleCancelClick}
            >
              {t('memoModalButton.cancel')}
            </Button>
            <Button
              className="border-2 border-iff-cyan-dark"
              size="medium"
              shadow={false}
              onClick={handleOkClick}
            >
              {t('memoModalButton.ok')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

interface NFTButtonsProperties {
  onMemoClick: () => void
}

function NFTButtons(properties: NFTButtonsProperties) {
  const { onMemoClick } = properties
  const t = useScopedI18n('overview.iffNFTMyNFT.nftButtons')

  return (
    <div className="flex flex-1 flex-row flex-nowrap items-center justify-between">
      <NFTButton
        className="border-iff-orange text-iff-orange"
        size="small"
        outline
      >
        {t('burn')}
      </NFTButton>
      <NFTButton
        className="text-iff-purple-lighter"
        size="small"
        onClick={onMemoClick}
      >
        {t('memo')}
      </NFTButton>
    </div>
  )
}

export interface PanelIFFNFTProperties {
  myIFFNFT: NFTItem[]
  isLoading?: boolean
}

export function PanelIFFNFT(properties: PanelIFFNFTProperties) {
  const { myIFFNFT, isLoading } = properties
  const sortedNFTs = sortNFTItems(myIFFNFT).reverse()
  const t = useScopedI18n('overview.panelIFFNFT')
  const timezone = useSortByTimezone()
  const [isOpen, setIsOpen] = React.useState(false)
  const handleModalOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [])
  const handleModalClose = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="min-h-[640px] px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-4">{t('tabTitle')}</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="mb-4 flex flex-col md:mb-8">
        {isLoading ? (
          <div className="flex justify-center">{t('loading')}</div>
        ) : (
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
        )}
      </section>
      <MemoModal isOpen={isOpen} onModalClose={handleModalClose} />
    </div>
  )
}
