import { NFTFrame } from 'components/NFTs'
import type { NFTItem } from 'types'

import { SectionTitle } from './title'

export type MintItMyNFTProps = {
  myNFT: NFTItem[]
}

export function MintItMyNFT(props: MintItMyNFTProps) {
  const { myNFT } = props
  return (
    <section className="flex flex-col">
      <SectionTitle
        className="mb-8 uppercase"
        size="medium"
        count={myNFT.length}
      >
        MY NFT
      </SectionTitle>
      <div className="flex flex-row">
        {myNFT.map((nft, index) => (
          <NFTFrame
            className="mr-[30px] mb-[30px]"
            key={`${nft.name}-${index}`}
            expired={false}
            hideTime={true}
            {...nft}
          />
        ))}
      </div>
    </section>
  )
}
