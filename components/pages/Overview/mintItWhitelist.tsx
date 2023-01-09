import { NFTButton } from 'components/Buttons'
import { ExternalLinkIcon } from 'components/Icons'
import { NFTFrame } from 'components/NFTs'
import { useSortByTimezone } from 'hooks'
import { useTranslation } from 'next-i18next'
import React from 'react'
import type { BaseComponent, NFTItem } from 'types'
import { classNames, filteredNFTItems } from 'utils'

import { SectionTitle, SectionTitleWithSortTimezone } from './title'

type WhitelistContainerProps = {
  name: string
  count: number
  children: React.ReactNode
}

function WhitelistContainer(props: WhitelistContainerProps) {
  const { name, count, children } = props
  return (
    <div className="flex flex-col">
      <SectionTitle className="mb-[10px] uppercase" size="small" count={count}>
        {name}
      </SectionTitle>
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {children}
      </div>
    </div>
  )
}

type WhitelistProps = {
  nftList: NFTItem[]
  zone: string
}

function MyWhitelist(props: WhitelistProps) {
  const { nftList, zone } = props
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItWhitelist.myWhitelist',
  })
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

function PreSaleWhitelist(props: WhitelistProps) {
  const { nftList, zone } = props
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelMintIt.mintItWhitelist.preSaleWhitelist',
  })
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

export type MintItWhitelistProps = BaseComponent & {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
}

export function MintItWhitelist(props: MintItWhitelistProps) {
  const { myWhitelist, preSaleWhitelist, className } = props
  const { t } = useTranslation('overview')
  const timezone = useSortByTimezone()

  return (
    <section className={classNames('flex flex-col', className)}>
      <SectionTitleWithSortTimezone
        className="mb-5"
        title={t('overview.panelMintIt.mintItWhitelist.sectionTitle.title')}
      />
      <div className="flex flex-col gap-8 md:gap-16">
        <MyWhitelist nftList={myWhitelist} zone={timezone.value} />
        <PreSaleWhitelist nftList={preSaleWhitelist} zone={timezone.value} />
      </div>
    </section>
  )
}
