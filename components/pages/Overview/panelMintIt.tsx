import { FilterGroup, FilterItem } from './filter'
import { MintItMyNFT, MintItMyNFTProps } from './mintItMyNFT'
import { MintItWhitelist, MintItWhitelistProps } from './mintItWhitelist'
import { TabTitle } from './title'

export type PanelMintItProps = MintItWhitelistProps & MintItMyNFTProps

export function PanelMintIt(props: PanelMintItProps) {
  return (
    <div className="py-[50px] px-5">
      <TabTitle className="mb-4">All You Can Mint</TabTitle>
      <FilterGroup className="mb-7" name="nftType">
        <FilterItem value="all" count={15}>
          ALL
        </FilterItem>
        <FilterItem value="whitelist" count={11}>
          WHITELIST
        </FilterItem>
        <FilterItem value="nft" count={4}>
          NFT
        </FilterItem>
      </FilterGroup>
      <div className="flex flex-col gap-28">
        <MintItWhitelist {...props} />
        <MintItMyNFT {...props} />
      </div>
    </div>
  )
}
