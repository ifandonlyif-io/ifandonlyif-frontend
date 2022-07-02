import { NFTButton } from 'components/Buttons'
import { NFTFrame } from 'components/NFTs'
import { useSortByTimezone } from 'hooks'
import { NFTItem } from 'types'
import { sortNFTItems } from 'utils'

import { SectionTitleWithSortTimezone, TabTitle } from './title'

function NFTButtons() {
  return (
    <div className="flex flex-row flex-nowrap flex-1 justify-between items-center">
      <NFTButton
        className="!text-[#A585FF] !border-[#A585FF]"
        size="small"
        outline
      >
        VIEW
      </NFTButton>
      <NFTButton className="!text-[#CBB9FF]" size="small">
        MEMO
      </NFTButton>
    </div>
  )
}

export type PanelIFFNFTProps = {
  myIFFNFT: NFTItem[]
}

export function PanelIFFNFT(props: PanelIFFNFTProps) {
  const { myIFFNFT } = props
  const sortedNFTs = sortNFTItems(myIFFNFT).reverse()
  const timezone = useSortByTimezone()
  return (
    <div className="py-[50px] px-5 min-h-[640px]">
      <TabTitle className="mb-4">MY IFFNFT</TabTitle>
      <SectionTitleWithSortTimezone className="mb-4" />
      <section className="flex flex-col">
        <div className="flex flex-row flex-wrap gap-[30px]">
          {sortedNFTs.map((nft, index) => (
            <NFTFrame
              key={`${nft.name}-${index}`}
              expired={false}
              zone={timezone.value}
              {...nft}
            >
              <NFTButtons />
            </NFTFrame>
          ))}
        </div>
      </section>
    </div>
  )
}
