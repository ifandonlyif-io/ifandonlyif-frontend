import type { NFTItem } from '../types'
import { isHistorical } from './date-time'

export function sortNFTItems(items: NFTItem[]): NFTItem[] {
  return items.sort((l, r) => l.unixEpoch - r.unixEpoch)
}

export function filterExpired(items: NFTItem[]): NFTItem[] {
  return items.filter((item) => isHistorical(item.unixEpoch))
}

type FilteredNFTItems = {
  availableNFTs: NFTItem[]
  expiredNFTs: NFTItem[]
}
export function filteredNFTItems(items: NFTItem[]): FilteredNFTItems {
  const sortedNFTs = sortNFTItems(items)
  const expiredNFTs = filterExpired(sortedNFTs).reverse()
  const availableNFTs = sortedNFTs.filter((nft) => !expiredNFTs.includes(nft))
  return { availableNFTs, expiredNFTs }
}
