import { BigNumber } from 'ethers'
import { isHexString } from 'ethers/lib/utils'
import { MyNFTItem, OwnedNft } from 'types'

import { parseISODateTime } from './datetime'

export function convertStringToNumber(str: string): number {
  if (isHexString(str)) return BigNumber.from(str).toNumber()
  if (!Number.isNaN(str)) return Number(str)
  return 0
}

function sortOwnedNft(left: OwnedNft, right: OwnedNft): number {
  const leftSec = parseISODateTime(left.timeLastUpdated)
  const rightSec = parseISODateTime(right.timeLastUpdated)
  return leftSec - rightSec
}

export function convertOwnedNftsToMyNfts(ownedNfts: OwnedNft[]): MyNFTItem[] {
  const result = ownedNfts.sort(sortOwnedNft).map((owned) => {
    const address = owned.contract.address
    const name = owned.contractMetadata.name || 'NFT Project'
    const symbol = owned.contractMetadata.symbol || 'NFT'
    const tokenId = convertStringToNumber(owned.id.tokenId)
    const tokenType =
      owned.id?.tokenMetadata?.tokenType || owned.contractMetadata.tokenType
    const imageUri =
      Array.isArray(owned.media) && owned.media.length > 0
        ? owned.media[0].thumbnail || owned.media[0].gateway
        : ''
    const unixEpoch = parseISODateTime(owned.timeLastUpdated)
    return { address, name, symbol, tokenId, tokenType, imageUri, unixEpoch }
  })
  return result
}
