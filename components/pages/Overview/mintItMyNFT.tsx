import { NFTFrame } from 'components/NFTs'
import type { BaseComponent, NFTItem } from 'types'
import { classNames } from 'utils'

import { SectionTitle } from './title'

export type MintItMyNFTProps = BaseComponent & {
  myNFT: NFTItem[]
}

export function MintItMyNFT(props: MintItMyNFTProps) {
  const { myNFT, className } = props
  return (
    <section className={classNames('flex flex-col', className)}>
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
