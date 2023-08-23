import type { ParsedUrlQuery } from 'node:querystring'

import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { getIffNftInfoById } from '@/backend'
import { Button } from '@/components/Buttons'
import { NeonBorder } from '@/components/Decorate'
import { Rotate360Icon } from '@/components/Icons'
import { NFTCard, type NFTCardProperties } from '@/components/NFTs'
import { useScopedI18n } from '@/locales'
import { cn, convertIffNftToNFTCardInfo } from '@/utils'

interface NFTViewProperties {
  nftData: NFTCardProperties
}

const NFTView: NextPage<NFTViewProperties> = (
  properties: NFTViewProperties,
) => {
  const { nftData } = properties
  const t = useScopedI18n('nft.nftView')
  const router = useRouter()
  const [flip, setFlip] = React.useState(false)
  const handleCardFlip = React.useCallback(() => {
    setFlip(!flip)
  }, [flip])
  const handleBackClick = React.useCallback(() => {
    router.back()
  }, [router])

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
              <p>#{nftData.tokenId}</p>
            </div>
            <Button
              className="hidden !w-[116px] md:flex"
              onClick={handleBackClick}
            >
              {t('backButton')}
            </Button>
          </div>
          <div className="mb-6 flex flex-col items-center rounded-xl bg-[#00183C]/50 p-6 backdrop-blur-[54px] md:mb-0">
            <NFTCard {...nftData} flipBack={flip} />
            <button
              className={cn(
                'z-10 flex flex-row flex-nowrap items-center justify-center',
                '-mb-2 mt-4 text-sm font-bold text-iff-cyan',
              )}
              onClick={handleCardFlip}
            >
              <Rotate360Icon />
              <span className="ml-2.5 hidden md:inline-block">
                {t('flipButtonPress')}
              </span>
              <span className="ml-2.5 md:hidden">{t('flipButtonTap')}</span>
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

interface NFTViewParameters extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<
  NFTViewProperties,
  NFTViewParameters
> = async (context) => {
  if (!context.params) return await Promise.resolve({ notFound: true })
  const { id } = context.params
  const nftInfo = await getIffNftInfoById(id)
  const nftData = convertIffNftToNFTCardInfo(nftInfo)
  return await Promise.resolve({ props: { nftData } })
}

export default NFTView
