import { SelectMenuOption } from 'components/Forms'
import { NFTFrame } from 'components/NFTs'
import { DefaultTimezone } from 'data'
import React from 'react'
import type { BaseComponent, NFTItem } from 'types'
import { classNames } from 'utils'

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
      <div className="flex flex-row">{children}</div>
    </div>
  )
}

type WhitelistProps = {
  nftList: NFTItem[]
  zone: string
}

function MyWhitelist(props: WhitelistProps) {
  const { nftList, zone } = props
  return (
    <WhitelistContainer name="MY WHITELIST" count={nftList.length}>
      {nftList.map((nft, index) => (
        <NFTFrame
          className="mr-[30px] mb-[30px]"
          key={`${nft.name}-${index}`}
          zone={zone}
          {...nft}
        />
      ))}
    </WhitelistContainer>
  )
}

function PreSaleWhitelist(props: WhitelistProps) {
  const { nftList, zone } = props
  return (
    <WhitelistContainer name="PRE-SALE WHITELIST" count={nftList.length}>
      {nftList.map((nft, index) => (
        <NFTFrame
          className="mr-[30px] mb-[30px]"
          key={`${nft.name}-${index}`}
          zone={zone}
          {...nft}
        />
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
  const [timezone, setTimezone] =
    React.useState<SelectMenuOption>(DefaultTimezone)
  const handleTimezoneChange = React.useCallback(
    (option: SelectMenuOption) => setTimezone(option),
    []
  )
  return (
    <section className={classNames('flex flex-col', className)}>
      <SectionTitleWithSortTimezone
        className="mb-5"
        title="WHITELIST"
        onOptionChange={handleTimezoneChange}
      />
      <div className="flex flex-col gap-16">
        <MyWhitelist nftList={myWhitelist} zone={timezone.value} />
        <PreSaleWhitelist nftList={preSaleWhitelist} zone={timezone.value} />
      </div>
    </section>
  )
}
