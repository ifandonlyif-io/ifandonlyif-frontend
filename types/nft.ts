import type {
  AcquiredAt,
  Media,
  NftContract,
  NftMetadata,
  SpamInfo,
  TokenUri,
} from 'alchemy-sdk'

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

declare interface BaseNftContract {
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

declare interface BaseNft {
  /** The NFT's underlying contract and relevant contract metadata. */
  contract: BaseNftContract
  id: NftId
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
  /** The NFT's relevant contract metadata. */
  contractMetadata: NftContract
}

export declare interface Nft extends BaseNft {
  /** The token balance of the NFT. */
  balance?: string
  /** Holds an error message if there was an issue fetching metadata. */
  error?: string | undefined
  /** Detailed information on whether and why an NFT contract was classified as spam. */
  spamInfo?: SpamInfo | undefined
  /**
   * Time at which the NFT was most recently acquired by the user.
   * Only available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the request.
   */
  acquiredAt?: AcquiredAt | undefined
}

export declare interface FetchUserNftsResponse {
  /** The NFTs owned by the provided address. */
  ownedNfts: Nft[]
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
  ownedNfts: Nft[]
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

export declare type FetchIffNftByIdResponse = Nft

export declare interface MintIffNftFormData {
  inputAddress: `0x${string}`
  userInfo: `0x${string}`
}
