import type { NFTItem } from 'types'

export declare type GetDemoNFTListResponse = {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
}

export declare type CheckSiteUrlFormData = {
  siteUrl: string
}

export declare type NftProject = {
  id: string
  name: string
  contractAddress: string
  collectionName: string
  imageUri: string
}
