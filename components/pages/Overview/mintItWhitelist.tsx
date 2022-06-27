import { NFTFrame } from 'components/NFTs'
import type { NFTItem } from 'types'

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
}

function MyWhitelist(props: WhitelistProps) {
  const { nftList } = props
  return (
    <WhitelistContainer name="MY WHITELIST" count={nftList.length}>
      {nftList.map((nft, index) => (
        <NFTFrame
          className="mr-[30px] mb-[30px]"
          key={`${nft.name}-${index}`}
          {...nft}
        />
      ))}
    </WhitelistContainer>
  )
}

function PreSaleWhitelist(props: WhitelistProps) {
  const { nftList } = props
  return (
    <WhitelistContainer name="PRE-SALE WHITELIST" count={nftList.length}>
      {nftList.map((nft, index) => (
        <NFTFrame
          className="mr-[30px] mb-[30px]"
          key={`${nft.name}-${index}`}
          {...nft}
        />
      ))}
    </WhitelistContainer>
  )
}

export type MintItWhitelistProps = {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
}

export function MintItWhitelist(props: MintItWhitelistProps) {
  const { myWhitelist, preSaleWhitelist } = props
  return (
    <section className="flex flex-col">
      <SectionTitleWithSortTimezone
        className="mb-5"
        title="WHITELIST"
        onOptionChange={() => void 0}
      />
      <div className="flex flex-col gap-16">
        <MyWhitelist nftList={myWhitelist} />
        <PreSaleWhitelist nftList={preSaleWhitelist} />
      </div>
    </section>
  )
}
