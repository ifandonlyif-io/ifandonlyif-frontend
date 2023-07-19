import type { DeepString } from '@/types'

export const nft = {
  nftView: {
    heading: 'CHECK NFT HOLDER',
    backButton: 'BACK',
    flipButtonPress: 'Press to flip',
    flipButtonTap: 'Tap to flip',
  },
} as const

export type NftTranslation = DeepString<typeof nft>
