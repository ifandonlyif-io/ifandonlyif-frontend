import useSWR from 'swr'

import type { Nft } from '@/types'
import { convertOwnedNftsToNftItems } from '@/utils'

import { usePrivateFetch } from './use-private-fetch'

interface FetchUserNftsResponse {
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

export function useUserNFTs() {
  const [fetch, onFetchError] = usePrivateFetch()
  const { data, isLoading } = useSWR(
    '/auth/fetchUserNft',
    async (key) => {
      const response = await fetch<string>(key, { method: 'POST' })
      const parsedResponse = JSON.parse(response) as FetchUserNftsResponse
      return convertOwnedNftsToNftItems(parsedResponse.ownedNfts)
    },
    { onError: onFetchError },
  )

  return [data, isLoading] as const
}
