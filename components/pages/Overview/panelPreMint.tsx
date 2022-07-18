import { NFTButton } from 'components/Buttons'
import { ExternalLinkIcon } from 'components/Icons'
import { NFTFrame } from 'components/NFTs'
import { useSortByTimezone } from 'hooks'
import React from 'react'
import { NFTItem } from 'types'
import { filteredNFTItems } from 'utils'

import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

export type PanelPreMintProps = {
  preMintWhitelist: NFTItem[]
}

export function PanelPreMint(props: PanelPreMintProps) {
  const { preMintWhitelist } = props
  const timezone = useSortByTimezone()
  const { availableNFTs, expiredNFTs } = filteredNFTItems(preMintWhitelist)
  return (
    <div className="min-h-[640px] py-[50px] px-5">
      <TabTitle className="mb-4">Pre-mint NFT</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="flex flex-col">
        <SectionTitle className="mb-[10px] uppercase" size="small" count={5}>
          MY WHITELIST
        </SectionTitle>
        <div className="flex flex-row flex-wrap gap-[30px]">
          {availableNFTs.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              zone={timezone.value}
              {...nft}
            >
              <NFTButton>
                GO MINT&nbsp;
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
