import { Button, NFTButton } from 'components/Buttons'
import { Radio, RadioGroup, Textarea } from 'components/Forms'
import { Modal, ModalProps } from 'components/Modal'
import { NFTFrame } from 'components/NFTs'
import { useSortByTimezone } from 'hooks'
import React from 'react'
import { BaseComponent, NFTItem } from 'types'
import { classNames, sortNFTItems } from 'utils'

import { SectionTitleWithSortTimezone, TabTitle } from './title'

type MemoModalTitleProps = BaseComponent & {
  title: string
  rightElement?: React.ReactNode
}

function MemoModalTitle(props: MemoModalTitleProps) {
  const { className, title, rightElement } = props
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

type MemoModalInfoBarProps = BaseComponent

function MemoModalInfoBar(props: MemoModalInfoBarProps) {
  const { className } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap justify-between items-center',
        'w-full h-[74px] px-6 bg-[#F0F0F0] rounded-[5px]',
        'font-bold text-base text-iff-text',
        className
      )}
    >
      <p className="m-0">2022.5.10 10:20</p>
      <p className="m-0">verified by IFANDONLYIF</p>
    </div>
  )
}

type MemoModalProps = ModalProps

function MemoModal(props: MemoModalProps) {
  const { isOpen, onModalClose } = props
  const PoweredBy = () => (
    <p className="text-base font-medium text-iff-text">
      Powered by&nbsp;
      <span className="font-semibold text-[#14D6D6]">Meta.io</span>
    </p>
  )
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
      <div className="flex flex-col px-20 pt-7 pb-9">
        <h2 className="mb-8 text-2xl font-bold text-center text-iff-text">
          Memo on IFFNFT
        </h2>
        <form className="flex flex-col min-w-[390px]" action="#">
          <MemoModalTitle className="mb-4" title="Write a memo" />
          <RadioGroup className="mb-3" name="memo">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
          <Textarea className="[resize:none] mb-8 w-full h-[88px]" />

          <MemoModalTitle className="mb-4" title="Add KYC info" />
          <RadioGroup className="mb-3" name="info">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>
          <MemoModalInfoBar className="mb-8" />

          <MemoModalTitle
            className="mb-4"
            title="On chain"
            rightElement={<PoweredBy />}
          />
          <RadioGroup className="mb-3" name="chain">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroup>

          <div className="grid grid-cols-2 gap-[10px] mt-16">
            <Button
              className="!bg-white border-[2px]"
              size="medium"
              shadow={false}
              onClick={handleCancelClick}
            >
              CANCEL
            </Button>
            <Button
              className="border-[2px] border-[#14D6D6]"
              size="medium"
              shadow={false}
              onClick={handleOkClick}
            >
              OK
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

type NFTButtonsProps = {
  onMemoClick: () => void
}

function NFTButtons(props: NFTButtonsProps) {
  const { onMemoClick } = props
  return (
    <div className="flex flex-row flex-nowrap flex-1 justify-between items-center">
      <NFTButton
        className="!text-[#A585FF] !border-[#A585FF]"
        size="small"
        outline
      >
        VIEW
      </NFTButton>
      <NFTButton className="!text-[#CBB9FF]" size="small" onClick={onMemoClick}>
        MEMO
      </NFTButton>
    </div>
  )
}

export type PanelIFFNFTProps = {
  myIFFNFT: NFTItem[]
}

export function PanelIFFNFT(props: PanelIFFNFTProps) {
  const { myIFFNFT } = props
  const sortedNFTs = sortNFTItems(myIFFNFT).reverse()
  const timezone = useSortByTimezone()
  const [isOpen, setIsOpen] = React.useState(false)
  const handleModalOpen = React.useCallback(() => setIsOpen(true), [])
  const handleModalClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <div className="py-[50px] px-5 min-h-[640px]">
      <TabTitle className="mb-4">MY IFFNFT</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="flex flex-col">
        <div className="flex flex-row flex-wrap gap-[30px]">
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
