import React from 'react'

import { NFTButton } from '@/components/Buttons'
import { ExternalLinkIcon } from '@/components/Icons'
import { NFTFrame } from '@/components/NFTs'
import { useSortByTimezone } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { NFTItem } from '@/types'
import { filteredNFTItems } from '@/utils'

import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

type PreMintWhitelistProperties = {
  nfts: NFTItem[]
}

function PreMintWhitelist(properties: PreMintWhitelistProperties) {
  const { nfts } = properties
  const t = useScopedI18n('overview.preMintWhitelist')
  const timezone = useSortByTimezone()
  const { availableNFTs, expiredNFTs } = filteredNFTItems(nfts)

  return (
    <section className="mb-4 flex flex-col md:mb-8">
      <SectionTitle className="mb-2.5 uppercase" size="small" count={5}>
        {t('title')}
      </SectionTitle>
      <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
        {availableNFTs.map((nft, index) => (
          <NFTFrame key={`${nft.name}-${index}`} zone={timezone.value} {...nft}>
            <NFTButton>
              {t('nftButton')}&nbsp;
              <ExternalLinkIcon fontSize={16} />
            </NFTButton>
          </NFTFrame>
        ))}
        {expiredNFTs.map((nft, index) => (
          <NFTFrame
            key={`${nft.name}-${index}`}
            zone={timezone.value}
            {...nft}
          />
        ))}
      </div>
    </section>
  )
}

export type PanelPreMintProperties = {
  preMintWhitelist: PreMintWhitelistProperties['nfts']
}

export function PanelPreMint(properties: PanelPreMintProperties) {
  const { preMintWhitelist } = properties
  const t = useScopedI18n('overview.panelPreMint')

  return (
    <div className="min-h-[640px] px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-4">{t('tabTitle')}</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <PreMintWhitelist nfts={preMintWhitelist} />
    </div>
  )
}
