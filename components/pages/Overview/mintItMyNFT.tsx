import { NFTButton } from 'components/Buttons'
import { NFTFrame } from 'components/NFTs'
import type { BaseComponent, NFTItem } from 'types'
import { classNames, sortNFTItems } from 'utils'

import { SectionTitle } from './title'

export type MintItMyNFTProps = BaseComponent & {
  myNFT: NFTItem[]
}

export function MintItMyNFT(props: MintItMyNFTProps) {
  const { myNFT, className } = props
  const sortedNFTs = sortNFTItems(myNFT).reverse()
  return (
    <section className={classNames('flex flex-col', className)}>
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={sortedNFTs.length}
      >
        MY NFT
      </SectionTitle>
      <div className="flex flex-row flex-wrap gap-[30px]">
        {sortedNFTs.map((nft, index) => (
          <NFTFrame
            key={`${nft.name}-${index}`}
            expired={false}
            hideTime={true}
            {...nft}
          >
            <NFTButton>MINT TO IFFNFT</NFTButton>
          </NFTFrame>
        ))}
      </div>
    </section>
  )
}
