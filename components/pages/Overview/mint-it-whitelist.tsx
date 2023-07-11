import React from 'react'

import { NFTButton } from '@/components/Buttons'
import { ExternalLinkIcon } from '@/components/Icons'
import { NFTFrame } from '@/components/NFTs'
import { useSortByTimezone } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { BaseComponent, NFTItem } from '@/types'
import { cn, filteredNFTItems } from '@/utils'

import { SectionTitle, SectionTitleWithSortTimezone } from './title'

type WhitelistContainerProperties = {
  name: string
  count: number
  children: React.ReactNode
}

function WhitelistContainer(properties: WhitelistContainerProperties) {
  const { name, count, children } = properties
  return (
    <div className="flex flex-col">
      <SectionTitle className="mb-2.5 uppercase" size="small" count={count}>
        {name}
      </SectionTitle>
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {children}
      </div>
    </div>
  )
}

type WhitelistProperties = {
  nftList: NFTItem[]
  zone: string
}

function MyWhitelist(properties: WhitelistProperties) {
  const { nftList, zone } = properties
  const t = useScopedI18n('overview.mintItWhitelist.myWhitelist')
  const { availableNFTs, expiredNFTs } = filteredNFTItems(nftList)

  return (
    <WhitelistContainer name={t('name')} count={nftList.length}>
      {availableNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft}>
          <NFTButton>{t('nftButton')}</NFTButton>
        </NFTFrame>
      ))}
      {expiredNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft} />
      ))}
    </WhitelistContainer>
  )
}

function PreSaleWhitelist(properties: WhitelistProperties) {
  const { nftList, zone } = properties
  const t = useScopedI18n('overview.mintItWhitelist.preSaleWhitelist')
  const { availableNFTs, expiredNFTs } = filteredNFTItems(nftList)

  return (
    <WhitelistContainer name={t('name')} count={nftList.length}>
      {availableNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft}>
          <NFTButton outline>
            {t('nftButton')}
            &nbsp;
            <ExternalLinkIcon fontSize={16} />
          </NFTButton>
        </NFTFrame>
      ))}
      {expiredNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft} />
      ))}
    </WhitelistContainer>
  )
}

export type MintItWhitelistProperties = BaseComponent & {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
}

export function MintItWhitelist(properties: MintItWhitelistProperties) {
  const { myWhitelist, preSaleWhitelist, className } = properties
  const t = useScopedI18n('overview.mintItWhitelist')
  const timezone = useSortByTimezone()

  return (
    <section className={cn('flex flex-col', className)}>
      <SectionTitleWithSortTimezone className="mb-5" title={t('title')} />
      <div className="flex flex-col gap-8 md:gap-16">
        <MyWhitelist nftList={myWhitelist} zone={timezone.value} />
        <PreSaleWhitelist nftList={preSaleWhitelist} zone={timezone.value} />
      </div>
    </section>
  )
}
