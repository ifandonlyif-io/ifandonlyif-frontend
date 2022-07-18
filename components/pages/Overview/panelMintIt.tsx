import { FilterGroup, FilterItem } from 'components/Forms'
import React from 'react'
import { classNames } from 'utils'

import { MintItMyNFT, MintItMyNFTProps } from './mintItMyNFT'
import { MintItWhitelist, MintItWhitelistProps } from './mintItWhitelist'
import { TabTitle } from './title'

export type PanelMintItProps = MintItWhitelistProps & MintItMyNFTProps

type FilterValues = 'all' | 'whitelist' | 'nft'

type FilterOption = { label: string; value: FilterValues; count: number }

export function PanelMintIt(props: PanelMintItProps) {
  const { myWhitelist, preSaleWhitelist, myNFT } = props
  const whitelistCount = myWhitelist.length + preSaleWhitelist.length
  const allCount = whitelistCount + myNFT.length
  const filterItems: FilterOption[] = [
    { label: 'ALL', value: 'all', count: allCount },
    { label: 'WHITELIST', value: 'whitelist', count: whitelistCount },
    { label: 'NFT', value: 'nft', count: myNFT.length },
  ]
  const [mintFilter, setMintFilter] = React.useState<string>('all')
  const handleFilterChange = React.useCallback(
    (value: string) => setMintFilter(value),
    []
  )
  const isShowAll = mintFilter === 'all'
  const isShowWhitelist = isShowAll || mintFilter === 'whitelist'
  const isShowMy = isShowAll || mintFilter === 'nft'
  return (
    <div className="py-[50px] px-5">
      <TabTitle className="mb-4">All You Can Mint</TabTitle>
      <FilterGroup
        className="mb-7"
        name="nftType"
        defaultValue={mintFilter}
        onFilterChange={handleFilterChange}
      >
        {filterItems.map((item) => (
          <FilterItem value={item.value} count={item.count} key={item.value}>
            {item.label}
          </FilterItem>
        ))}
      </FilterGroup>
      <div className="mb-[30px] flex flex-col gap-28">
        <MintItWhitelist
          className={classNames(isShowWhitelist ? 'flex' : 'hidden')}
          {...props}
        />
        <MintItMyNFT
          className={classNames(isShowMy ? 'flex' : 'hidden')}
          {...props}
        />
      </div>
    </div>
  )
}
