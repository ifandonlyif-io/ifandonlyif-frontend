import { useTranslation } from 'next-i18next'
import React from 'react'

import { FilterGroup, FilterItem } from '@/components/Forms'
import { classNames } from '@/utils'

import { MintItMyNFT, type MintItMyNFTProperties } from './mint-it-my-nft'
import {
  // MintItWhitelist,
  type MintItWhitelistProperties,
} from './mint-it-whitelist'
import { TabTitle } from './title'

export type PanelMintItProperties = MintItWhitelistProperties &
  MintItMyNFTProperties

type FilterValues = 'all' | 'whitelist' | 'nft'

type FilterOption = { value: FilterValues; count: number }

export function PanelMintIt(properties: PanelMintItProperties) {
  const { myNFTs } = properties
  const { t } = useTranslation('overview')
  // const whitelistCount = myWhitelist.length + preSaleWhitelist.length
  // const allCount = whitelistCount + myNFTs.length
  const allCount = myNFTs.length
  const filterItems: FilterOption[] = [
    { value: 'all', count: allCount },
    // { value: 'whitelist', count: whitelistCount },
    { value: 'nft', count: myNFTs.length },
  ]
  const [mintFilter, setMintFilter] = React.useState<string>('all')
  const handleFilterChange = React.useCallback(
    (value: string) => setMintFilter(value),
    []
  )
  const isShowAll = mintFilter === 'all'
  // const isShowWhitelist = isShowAll || mintFilter === 'whitelist'
  const isShowMy = isShowAll || mintFilter === 'nft'

  return (
    <div className="px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-4">{t('overview.panelMintIt.tabTitle')}</TabTitle>
      <FilterGroup
        className="mb-7"
        name="nftType"
        defaultValue={mintFilter}
        onFilterChange={handleFilterChange}
      >
        {filterItems.map((item) => (
          <FilterItem value={item.value} count={item.count} key={item.value}>
            {t(`overview.panelMintIt.filterOption.${item.value}`)}
          </FilterItem>
        ))}
      </FilterGroup>
      <div className="mb-4 flex flex-col gap-10 md:mb-8 md:gap-28">
        {/* <MintItWhitelist
          className={classNames(isShowWhitelist ? 'flex' : 'hidden')}
          {...props}
        /> */}
        <MintItMyNFT
          className={classNames(isShowMy ? 'flex' : 'hidden')}
          {...properties}
        />
      </div>
    </div>
  )
}
