import { hexToNumber, isHex } from 'viem'

import type { SelectMenuOption } from '@/components/Forms'
import type { NFTCardInfo } from '@/components/NFTs'
import type { Nft, NFTItem, NftProject } from '@/types'

import { parseISODateTime } from './date-time'

export function convertStringToNumber(string_: string): number {
  if (isHex(string_)) return hexToNumber(string_)
  const number_ = Number(string_)
  if (!Number.isNaN(number_)) return number_
  return 0
}

function sortOwnedNft(left: Nft, right: Nft): number {
  const leftSec = parseISODateTime(left.timeLastUpdated)
  const rightSec = parseISODateTime(right.timeLastUpdated)
  return leftSec - rightSec
}

export function convertOwnedNftsToNftItems(ownedNfts: Nft[]): NFTItem[] {
  const result = ownedNfts.sort(sortOwnedNft).map((owned) => {
    const address = owned.contract.address
    const name = owned.contractMetadata.name ?? 'NFT Project'
    const symbol = owned.contractMetadata.symbol ?? 'NFT'
    const tokenId = convertStringToNumber(owned.id.tokenId)
    const tokenType =
      owned.id.tokenMetadata?.tokenType || owned.contractMetadata.tokenType
    const imageUri =
      Array.isArray(owned.media) && owned.media.length > 0
        ? owned.media[0].thumbnail ?? owned.media[0].gateway
        : ''
    const unixEpoch = parseISODateTime(owned.timeLastUpdated)
    return { address, name, symbol, tokenId, tokenType, imageUri, unixEpoch }
  })
  return result
}

export function convertNftProjectsToSelectMenuOptions(
  projects: NftProject[],
): SelectMenuOption[] {
  const options = projects.map((project) => ({
    label: project.collectionName,
    value: project.id,
  }))
  return options
}

export function convertIffNftToNFTCardInfo(iffNft: Nft): NFTCardInfo {
  const address = iffNft.contract.address
  const name = iffNft.contractMetadata.name ?? 'NFT Project'
  const symbol = iffNft.contractMetadata.symbol ?? 'NFT'
  const tokenId = convertStringToNumber(iffNft.id.tokenId)
  const tokenType =
    iffNft.id.tokenMetadata?.tokenType || iffNft.contractMetadata.tokenType
  const imageUri =
    Array.isArray(iffNft.media) && iffNft.media.length > 0
      ? iffNft.media[0].thumbnail ?? iffNft.media[0].gateway
      : ''
  const unixEpoch = parseISODateTime(iffNft.timeLastUpdated)
  return {
    address,
    name,
    symbol,
    tokenId,
    tokenType,
    imageUri,
    unixEpoch,
    kycEpoch: unixEpoch,
  }
}
