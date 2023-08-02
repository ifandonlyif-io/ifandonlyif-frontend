import type { Media, NftMetadata, SpamInfo, TokenUri } from 'alchemy-sdk'

export declare interface NFTItem {
  address: string
  name: string
  symbol: string
  tokenId: number
  tokenType: string
  imageUri: string
  unixEpoch: number
}

export declare type MyNFTItem = NFTItem

declare interface NftContract {
  /** The address of the contract. */
  address: string
}

declare type NftTokenType = 'ERC721' | 'ERC1155'

declare interface NftId {
  /** The ID of the token. Can be in hex or decimal format. */
  tokenId: string
  tokenMetadata: {
    tokenType: NftTokenType
  }
}

declare interface NftContractMetadata {
  /** The name of the contract. */
  name?: string
  /** The symbol of the contract. */
  symbol?: string
  /** The number of NFTs in the contract as an integer string. */
  totalSupply?: string
  /** The type of the token in the contract. */
  tokenType: NftTokenType
}

export declare interface OwnedNft {
  /** The NFT's underlying contract and relevant contract metadata. */
  contract: NftContract
  id: NftId
  /** The token balance of the NFT. */
  balance: string
  /** Name of the NFT asset. */
  title: string | undefined
  /** Brief human-readable description */
  description: string | undefined
  /** URIs for accessing the NFT's metadata blob. */
  tokenUri: TokenUri | undefined
  /** URIs for accessing the NFT's media assets. */
  media: Media[]
  /**
   * Relevant metadata for NFT contract. This is useful for viewing image url, traits, etc.
   * without having to follow the metadata url in tokenUri to parse manually.
   */
  metadata: NftMetadata
  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string
  /** Holds an error message if there was an issue fetching metadata. */
  error: string | undefined
  /** The NFT's relevant contract metadata. */
  contractMetadata: NftContractMetadata
  /** Detailed information on whether and why an NFT contract was classified as spam. */
  spamInfo: SpamInfo | undefined
}

export declare interface FetchUserNftsResponse {
  /** The NFTs owned by the provided address. */
  ownedNfts: OwnedNft[]
  /**
   * Pagination token that can be passed into another request to fetch the next NFTs.
   * If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey: string | undefined
  /** The total count of NFTs owned by the provided address. */
  totalCount: number
  /** The block hash to get transaction receipts for. */
  blockHash: string
}

export declare interface FetchUserIffNftsResponse {
  /** The NFTs owned by the provided address. */
  ownedNfts: OwnedNft[]
  /**
   * Pagination token that can be passed into another request to fetch the next NFTs.
   * If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey: string | undefined
  /** The total count of NFTs owned by the provided address. */
  totalCount: number
  /** The block hash to get transaction receipts for. */
  blockHash: string
}

export declare interface MintIffNftFormData {
  inputAddress: `0x${string}`
  userInfo: `0x${string}`
}
