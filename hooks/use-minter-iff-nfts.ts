import useSWR from 'swr'

import type { Nft } from '@/types'
import { convertOwnedNftsToNftItems } from '@/utils'

import { usePrivateFetch } from './use-private-fetch'

export function useMinterIFFNFTs() {
  const [fetch, onFetchError] = usePrivateFetch()
  const { data, isLoading, mutate } = useSWR(
    '/auth/fetchMinterIffNfts',
    async (key) => {
      const response = await fetch<string>(key, { method: 'POST' })
      const parsedResponse = JSON.parse(response) as Nft[]
      return convertOwnedNftsToNftItems(parsedResponse)
    },
    { onError: onFetchError, refreshInterval: 10_000, keepPreviousData: true },
  )

  return [data, isLoading, mutate] as const
}
