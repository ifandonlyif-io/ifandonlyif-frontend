import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { Button } from '@/components/Buttons'
import { NeonBorder } from '@/components/Decorate'
import { Rotate360Icon } from '@/components/Icons'
import {
  type HolderRecord,
  NFTCard,
  type NFTCardProperties,
} from '@/components/NFTs'
import { classNames } from '@/utils'

const holderRecords: HolderRecord[] = [
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]
const demoNFTCard: NFTCardProperties = {
  name: 'BORED APE YACHT CLUB',
  nftId: 797,
  nftType: 'ERC-721',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  kycEpoch: 1_657_864_800,
  holderRecords,
  validity: true,
}

type NFTViewProperties = {
  nftData: NFTCardProperties
}

const NFTView: NextPage<NFTViewProperties> = (
  properties: NFTViewProperties
) => {
  const { nftData } = properties
  const { t } = useTranslation('nft', { keyPrefix: 'nftView' })
  const router = useRouter()
  const [flip, setFlip] = React.useState(false)
  const handleCardFlip = React.useCallback(() => setFlip(!flip), [flip])
  const handleBackClick = React.useCallback(() => router.back(), [router])

  return (
    <div className="block flex-row flex-nowrap items-center py-16 md:flex md:py-24">
      <NeonBorder className="hidden md:flex" color="cyan" />
      <div className="iff-glass-cyan shadow-iff-base md:-mx-9 md:flex-1">
        <div className="flex flex-col flex-nowrap px-4 py-6 md:flex-row md:justify-between md:px-20 md:py-7">
          <div className="flex flex-col">
            <h1 className="heading-4 md:heading-2 text-shadow-heading-1 mb-4 text-white md:mb-16">
              {t('heading')}
            </h1>
            <div className="text-md mb-5 flex flex-row font-bold text-white md:mb-6 md:flex-col md:text-xl">
              <h3 className="mr-5 md:mb-5">{nftData.name}</h3>
              <p>#{nftData.nftId}</p>
            </div>
            <Button
              className="hidden !w-[116px] md:flex"
              onClick={handleBackClick}
            >
              {t('backButton')}
            </Button>
          </div>
          <div className="mb-6 flex flex-col items-center rounded-[10px] bg-[#00183C]/50 p-6 backdrop-blur-[54px] md:mb-0">
            <NFTCard {...nftData} flipBack={flip} />
            <button
              className={classNames(
                'flex z-10 flex-row flex-nowrap justify-center items-cente',
                'mt-4 -mb-2 text-sm font-bold text-iff-cyan'
              )}
              onClick={handleCardFlip}
            >
              <Rotate360Icon />
              <span className="ml-[10px] hidden md:inline-block">
                {t('flipButton.press')}
              </span>
              <span className="ml-[10px] md:hidden">{t('flipButton.tap')}</span>
            </button>
          </div>
          <Button
            className="mb-2 ml-auto !w-[116px] md:hidden"
            onClick={handleBackClick}
          >
            {t('backButton')}
          </Button>
        </div>
      </div>
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  NFTViewProperties
> = async ({ locale = 'en-US' }) => {
  const i18n = await serverSideTranslations(locale, ['common', 'nft'])
  const nftData = demoNFTCard
  return { props: { ...i18n, nftData } }
}

export default NFTView
