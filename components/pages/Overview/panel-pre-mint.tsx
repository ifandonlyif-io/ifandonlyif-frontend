import { useTranslation } from 'next-i18next'
import React from 'react'

import { NFTButton } from '@/components/Buttons'
import { ExternalLinkIcon } from '@/components/Icons'
import { NFTFrame } from '@/components/NFTs'
import { useSortByTimezone } from '@/hooks'
import type { NFTItem } from '@/types'
import { filteredNFTItems } from '@/utils'

import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

export type PanelPreMintProperties = {
  preMintWhitelist: NFTItem[]
}

export function PanelPreMint(properties: PanelPreMintProperties) {
  const { preMintWhitelist } = properties
  const { t } = useTranslation('overview', {
    keyPrefix: 'overview.panelPreMint',
  })
  const timezone = useSortByTimezone()
  const { availableNFTs, expiredNFTs } = filteredNFTItems(preMintWhitelist)

  return (
    <div className="min-h-[640px] px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-4">{t('tabTitle')}</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="mb-4 flex flex-col md:mb-8">
        <SectionTitle className="mb-[10px] uppercase" size="small" count={5}>
          {t('sectionTitle')}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-[30px] md:flex md:flex-row md:flex-wrap">
          {availableNFTs.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              zone={timezone.value}
              {...nft}
            >
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
    </div>
  )
}
