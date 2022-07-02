import { NFTButton } from 'components/Buttons'
import { ExternalLinkIcon } from 'components/Icons'
import { NFTFrame } from 'components/NFTs'
import { useSortByTimezone } from 'hooks'
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
      <div className="flex flex-row flex-wrap gap-[30px]">{children}</div>
    </div>
  )
}

type WhitelistProps = {
  nftList: NFTItem[]
  zone: string
}

function MyWhitelist(props: WhitelistProps) {
  const { nftList, zone } = props
  const { availableNFTs, expiredNFTs } = filteredNFTItems(nftList)
  return (
    <WhitelistContainer name="MY WHITELIST" count={nftList.length}>
      {availableNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft}>
          <NFTButton>PRE-MINT</NFTButton>
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
  const { availableNFTs, expiredNFTs } = filteredNFTItems(nftList)
  return (
    <WhitelistContainer name="PRE-SALE WHITELIST" count={nftList.length}>
      {availableNFTs.map((nft, index) => (
        <NFTFrame key={`${nft.name}-${index}`} zone={zone} {...nft}>
          <NFTButton outline>
            VIEW&nbsp;
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
  const timezone = useSortByTimezone()
  return (
    <section className={classNames('flex flex-col', className)}>
      <SectionTitleWithSortTimezone className="mb-5" title="WHITELIST" />
      <div className="flex flex-col gap-16">
        <MyWhitelist nftList={myWhitelist} zone={timezone.value} />
        <PreSaleWhitelist nftList={preSaleWhitelist} zone={timezone.value} />
      </div>
    </section>
  )
}
