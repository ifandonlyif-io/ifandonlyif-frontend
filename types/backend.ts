import type { NFTItem } from './nft'

export declare interface GetDemoNFTListResponse {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
}

export declare interface CheckSiteUrlFormData {
  siteUrl: string
}

export declare interface NftProject {
  id: string
  name: string
  contractAddress: string
  collectionName: string
  imageUri: string
}

export declare interface IffNftMeta {
  address: string
  contractMetadata: {
    name: string
    symbol: string
    totalSupply: string
    tokenType: string
  }
}
