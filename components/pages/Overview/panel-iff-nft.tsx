import React from 'react'
import { useWaitForTransaction } from 'wagmi'

import { Button, NFTButton } from '@/components/Buttons'
import { SpinLoading } from '@/components/Loading'
import {
  CheckModal,
  type CheckModalProperties,
  Modal,
  type ModalProperties,
} from '@/components/Modal'
import { NFTFrame } from '@/components/NFTs'
import {
  useBurnIffNft,
  useMinterIFFNFTs,
  useSortByTimezone,
  useUserIFFNFTs,
} from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { NFTItem } from '@/types'
import { sortNFTItems } from '@/utils'

import { SectionTitleWithSortTimezone, TabTitle } from './title'

// type MemoModalLabelProperties = BaseComponent & {
//   title: string
//   rightElement?: React.ReactNode
// }

// function MemoModalLabel(properties: MemoModalLabelProperties) {
//   const { className, title, rightElement } = properties
//   return (
//     <div
//       className={cn(
//         'flex flex-row flex-nowrap items-center justify-between',
//         className,
//       )}
//     >
//       <h3 className="text-base font-bold text-iff-text">{title}&nbsp;-</h3>
//       {rightElement}
//     </div>
//   )
// }

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

// type MemoModalProperties = ModalProperties

// function MemoModal(properties: MemoModalProperties) {
//   const { isOpen, onModalClose } = properties
//   const t = useScopedI18n('overview.iffNFTMyNFT')
//   // const PoweredBy = () => (
//   //   <p className="text-base font-medium text-iff-text">
//   //     {t('memoModalPoweredBy')}&nbsp;
//   //     <span className="font-semibold text-iff-cyan-dark">Meta.io</span>
//   //   </p>
//   // )
//   const handleCancelClick = React.useCallback<
//     React.MouseEventHandler<HTMLButtonElement>
//   >(
//     (event) => {
//       event.preventDefault()
//       event.stopPropagation()
//       onModalClose && onModalClose()
//     },
//     [onModalClose],
//   )
//   const handleOkClick = React.useCallback<
//     React.MouseEventHandler<HTMLButtonElement>
//   >(
//     (event) => {
//       event.preventDefault()
//       event.stopPropagation()
//       onModalClose && onModalClose()
//     },
//     [onModalClose],
//   )

//   return (
//     <Modal isOpen={isOpen} onModalClose={onModalClose}>
//       <div className="flex flex-col px-20 pb-9 pt-7">
//         <h2 className="mb-8 text-center text-2xl font-bold text-iff-text">
//           {t('memoModalTitle')}
//         </h2>
//         <form className="flex min-w-[390px] flex-col" action="#">
//           <MemoModalLabel className="mb-4" title={t('memoModalLabel.memo')} />
//           <RadioGroup className="mb-3" name="memo">
//             <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
//             <Radio value="no">{t('memoModalRadio.no')}</Radio>
//           </RadioGroup>
//           <Textarea className="mb-8 h-[88px] w-full [resize:none]" />

//           {/* <MemoModalLabel className="mb-4" title={t('memoModalLabel.info')} />
//           <RadioGroup className="mb-3" name="info">
//             <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
//             <Radio value="no">{t('memoModalRadio.no')}</Radio>
//           </RadioGroup>
//           <MemoModalInfoBar className="mb-8" />

//           <MemoModalLabel
//             className="mb-4"
//             title={t('memoModalLabel.chain')}
//             rightElement={<PoweredBy />}
//           />
//           <RadioGroup className="mb-3" name="chain">
//             <Radio value="yes">{t('memoModalRadio.yes')}</Radio>
//             <Radio value="no">{t('memoModalRadio.no')}</Radio>
//           </RadioGroup> */}

//           <div className="mt-16 grid grid-cols-2 gap-2.5">
//             <Button
//               className="border-2 !bg-white"
//               size="medium"
//               shadow={false}
//               onClick={handleCancelClick}
//             >
//               {t('memoModalButton.cancel')}
//             </Button>
//             <Button
//               className="border-2 border-iff-cyan-dark"
//               size="medium"
//               shadow={false}
//               onClick={handleOkClick}
//             >
//               {t('memoModalButton.ok')}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   )
// }

function ProcessingModal(properties: Omit<ModalProperties, 'title'>) {
  const t = useScopedI18n('overview.mintItMyNFT')
  const title = t('processingModalTitle')

  return (
    <Modal title={title} {...properties}>
      <div className="flex flex-col items-center justify-center">
        <SpinLoading className="mr-2 h-8 w-8 fill-iff-purple text-gray-200 dark:text-gray-600" />
        <span className="sr-only">{title}</span>
      </div>
    </Modal>
  )
}

type BurnResultModalProperties = CheckModalProperties

function ResultModal(properties: BurnResultModalProperties) {
  const { isOpen, status, onModalClose } = properties
  const t = useScopedI18n('overview.iffNFTMyNFT')

  return (
    <CheckModal isOpen={isOpen} status={status} onModalClose={onModalClose}>
      <div className="text-center text-base font-bold text-iff-text">
        {status === 'success' && (
          <React.Fragment>
            <p>{t('resultModalSuccess.p1')}</p>
          </React.Fragment>
        )}
        {status === 'error' && (
          <React.Fragment>
            <p>{t('resultModalError.p1')}</p>
            <p>{t('resultModalError.p2')}</p>
          </React.Fragment>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        <Button
          className="max-w-[190px] border-2 border-iff-cyan-dark"
          size="medium"
          shadow={false}
          onClick={onModalClose}
        >
          {status === 'success' && t('resultModalButton.close')}
          {status === 'error' && t('resultModalButton.close')}
        </Button>
      </div>
    </CheckModal>
  )
}

interface BurnModalProperties extends ModalProperties {
  name: string
  onBurnClick?: () => void
}

function BurnModal(properties: BurnModalProperties) {
  const { name, isOpen, onModalClose, onBurnClick } = properties
  const t = useScopedI18n('overview.iffNFTMyNFT')
  const handleCancelClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      onModalClose && onModalClose()
    },
    [onModalClose],
  )
  const handleBurnClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      event.preventDefault()
      onBurnClick && onBurnClick()
    },
    [onBurnClick],
  )

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
      title={t('burnModalTitle')}
    >
      <div className="text-center text-base font-bold text-iff-text">
        {/* @ts-expect-error type issue */}
        <p>{t('burnModalInfo.p1', { name })}</p>
        <p>{t('burnModalInfo.p2')}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          className="border-2 !bg-white"
          size="medium"
          shadow={false}
          onClick={handleCancelClick}
        >
          {t('burnModalButton.cancel')}
        </Button>
        <Button
          className="border-2 border-iff-cyan-dark"
          size="medium"
          shadow={false}
          onClick={handleBurnClick}
        >
          {t('burnModalButton.burn')}
        </Button>
      </div>
    </Modal>
  )
}

interface NFTButtonsProperties {
  nft: NFTItem
  onBurnClick: (tokenId: number) => void
}

function NFTButtons(properties: NFTButtonsProperties) {
  const { nft, onBurnClick } = properties
  const t = useScopedI18n('overview.iffNFTMyNFT.nftButtons')

  const handleBurnClick = React.useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      tokenId: number,
    ) => {
      event.stopPropagation()
      onBurnClick && onBurnClick(tokenId)
      console.debug('handleBurnClick', tokenId)
    },
    [onBurnClick],
  )

  return (
    <div className="flex flex-1 flex-row flex-nowrap items-center justify-between gap-2.5">
      <NFTButton
        className="border-iff-orange text-iff-orange"
        outline
        onClick={(event) => handleBurnClick(event, nft.tokenId)}
      >
        {t('burn')}
      </NFTButton>
      {/* <NFTButton
        className="text-iff-purple-lighter"
        onClick={onMemoClick}
      >
        {t('memo')}
      </NFTButton> */}
    </div>
  )
}

export function PanelIFFNFT() {
  const t = useScopedI18n('overview.panelIFFNFT')
  const timezone = useSortByTimezone()

  const [myIffNfts, myIffNftsLoading] = useUserIFFNFTs()
  const [minterIffNfts, minterIffNftsLoading, minterMutate] = useMinterIFFNFTs()
  const isLoading = React.useMemo<boolean>(
    () => myIffNftsLoading || minterIffNftsLoading,
    [minterIffNftsLoading, myIffNftsLoading],
  )

  const sortedMyNFTs = React.useMemo(
    () => (myIffNfts ? sortNFTItems(myIffNfts) : undefined),
    [myIffNfts],
  )

  const [selectedNftId, setSelectedNftId] = React.useState<number>()
  const sortedMinterNFTs = React.useMemo(
    () => (minterIffNfts ? sortNFTItems(minterIffNfts) : undefined),
    [minterIffNfts],
  )
  const selectedNftName = React.useMemo(() => {
    const nft = sortedMinterNFTs?.find((nft) => nft.tokenId === selectedNftId)
    return nft ? `${nft.name} #${nft.tokenId}` : ''
  }, [selectedNftId, sortedMinterNFTs])

  const [isBurnModalOpen, setIsBurnModalOpen] = React.useState(false)
  const handleBurnModalOpen = React.useCallback((tokenId: number) => {
    console.debug('handleModalOpen', tokenId)
    setIsBurnModalOpen(true)
    setSelectedNftId(tokenId)
  }, [])
  const handleBurnModalClose = React.useCallback(() => {
    setIsBurnModalOpen(false)
  }, [])

  const [isProcessingModalOpen, setIsProcessingModalOpen] =
    React.useState(false)

  const { data, writeAsync, prepareError } = useBurnIffNft(selectedNftId)
  const handleBurnClick = React.useCallback(async () => {
    if (!selectedNftId) return
    setIsBurnModalOpen(false)

    if (prepareError) {
      console.error(prepareError)
      setResultModalStatus('error')
      setIsResultModalOpen(true)
      return
    }

    if (!writeAsync) return
    setIsProcessingModalOpen(true)
    await writeAsync()
  }, [prepareError, selectedNftId, writeAsync])

  const [resultModalStatus, setResultModalStatus] =
    React.useState<CheckModalProperties['status']>('success')
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false)
  const handleResultModalClose = React.useCallback(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setSelectedNftId(undefined)
    setIsResultModalOpen(false)
  }, [])

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => {
      console.debug(`Burned NFT with hash: ${data.transactionHash}`)
      void minterMutate()
      setIsProcessingModalOpen(false)
      setResultModalStatus('success')
      setIsResultModalOpen(true)
    },
  })

  return (
    <div className="min-h-[640px] px-4 py-6 md:px-5 md:py-[50px]">
      <div className="mb-4 flex flex-row items-center gap-4">
        <TabTitle>{t('tabTitle')}</TabTitle>
        {!!isLoading && (
          <SpinLoading className="h-6 w-6 fill-iff-purple text-gray-200 dark:text-gray-600" />
        )}
      </div>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="mb-4 flex flex-col md:mb-8">
        <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
          {sortedMinterNFTs?.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              expired={false}
              zone={timezone.value}
              {...nft}
            >
              <NFTButtons nft={nft} onBurnClick={handleBurnModalOpen} />
            </NFTFrame>
          ))}
          {sortedMyNFTs?.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              expired={false}
              zone={timezone.value}
              {...nft}
            />
          ))}
        </div>
      </section>
      <BurnModal
        name={selectedNftName}
        isOpen={isBurnModalOpen}
        onModalClose={handleBurnModalClose}
        onBurnClick={handleBurnClick}
      />
      <ProcessingModal isOpen={isProcessingModalOpen} />
      <ResultModal
        isOpen={isResultModalOpen}
        status={resultModalStatus}
        onModalClose={handleResultModalClose}
      />
    </div>
  )
}
