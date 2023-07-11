export const Nft = {
  'nft.nftView.heading': 'CHECK NFT HOLDER',
  'nft.nftView.backButton': 'BACK',
  'nft.nftView.flipButtonPress': 'Press to flip',
  'nft.nftView.flipButtonTap': 'Tap to flip',
} as const

export type NftTranslation = Readonly<Record<keyof typeof Nft, string>>
