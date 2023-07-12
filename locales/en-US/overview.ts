export const Overview = {
  // TabData
  'overview.tabData.overview': 'Overview',
  'overview.tabData.mintIt': 'Mint it',
  'overview.tabData.premintNft': 'Pre-mint NFT',
  'overview.tabData.iffNft': 'IFFNFT',
  'overview.tabData.kycRecord': 'KYC Record',
  // PanelOverview
  'overview.panelOverview.tabTitle': 'Overview',
  // OverviewStatus
  'overview.overviewStatus.whitelist.title': 'WHITELIST STATUS',
  'overview.overviewStatus.whitelist.expire': 'Expire Soon',
  'overview.overviewStatus.whitelist.preMint': 'Pre-mint Soon',
  'overview.overviewStatus.whitelist.all': 'All',
  'overview.overviewStatus.whitelist.alive': 'Alive',
  'overview.overviewStatus.whitelist.expired': 'Expired',
  'overview.overviewStatus.iffNfts.title': 'IFFNFTs STATUS',
  'overview.overviewStatus.iffNfts.recently': 'Recently Memoed',
  'overview.overviewStatus.iffNfts.all': 'All',
  'overview.overviewStatus.iffNfts.memoed': 'Memoed',
  'overview.overviewStatus.iffNfts.fully': 'Fully On chain',
  'overview.overviewStatus.viewLabel': 'View',
  // OverviewGas
  'overview.overviewGas.title': 'GAS PRICE',
  'overview.overviewGas.chartTitle': 'Average gas',
  'overview.overviewGas.yAxisTitle': 'Avg Gas (Gwei)',
  'overview.overviewGas.areaName': 'Gas (Gwei)',
  'overview.overviewGas.dateTime': 'Date & Time',
  'overview.overviewGas.value': 'Value',
  // OverviewWallet
  'overview.overviewWallet.title': 'MY WALLETs',
  'overview.overviewWallet.totalBalance': 'Total Balance',
  'overview.overviewWallet.toggleShow': 'Show',
  'overview.overviewWallet.toggleHide': 'Hide',
  // OverviewEmail
  'overview.overviewEmail.title': 'EMAIL ADDRESS',
  'overview.overviewEmail.labelDefault': 'Default',
  'overview.overviewEmail.labelNotification': 'Notification',
  // OverviewSocial
  'overview.overviewSocial.title': 'SOCIAL CONNECT',
  'overview.overviewSocial.labelVerified': 'Verified',
  // PanelMintIt
  'overview.panelMintIt.tabTitle': 'All You Can Mint',
  'overview.panelMintIt.filterOption.all': 'ALL',
  'overview.panelMintIt.filterOption.whitelist': 'WHITELIST',
  'overview.panelMintIt.filterOption.nft': 'NFT',
  // MintItWhitelist
  'overview.mintItWhitelist.title': 'Whitelist',
  'overview.mintItWhitelist.myWhitelist.name': 'My Whitelist',
  'overview.mintItWhitelist.myWhitelist.nftButton': 'Pre-Mint',
  'overview.mintItWhitelist.preSaleWhitelist.name': 'Pre-Sale Whitelist',
  'overview.mintItWhitelist.preSaleWhitelist.nftButton': 'View',
  // MintItMyNFT
  'overview.mintItMyNFT.title': 'My NFT',
  'overview.mintItMyNFT.nftButton': 'Mint To IFFNFT',
  'overview.mintItMyNFT.mintModalTitle': 'Mint {name}#{tokenId} to IFF NFT',
  'overview.mintItMyNFT.mintModalLabel.inputAddress': 'Mint to address',
  'overview.mintItMyNFT.mintModalLabel.userInfo': 'User info',
  'overview.mintItMyNFT.mintModalInput.inputAddress': 'Please input an address',
  'overview.mintItMyNFT.mintModalInput.userInfo': 'Please input an address',
  'overview.mintItMyNFT.mintModalMessage.required': 'Please input an address',
  'overview.mintItMyNFT.mintModalMessage.invalidAddress': 'Invalid address',
  'overview.mintItMyNFT.mintModalMessage.invalidWallet':
    'Address is not a wallet',
  'overview.mintItMyNFT.mintModalMessage.notOwnAddress':
    'Can not mint to own address',
  'overview.mintItMyNFT.mintModalMessage.invalidTypeId': 'Invalid nft type id',
  'overview.mintItMyNFT.mintModalButton.cancel': 'CANCEL',
  'overview.mintItMyNFT.mintModalButton.ok': 'OK',
  // PanelPreMint
  'overview.panelPreMint.tabTitle': 'Pre-mint NFT',
  // PreMintWhitelist
  'overview.preMintWhitelist.title': 'My Whitelist',
  'overview.preMintWhitelist.nftButton': 'Go Mint',
  // PanelIFFNFT
  'overview.panelIFFNFT.tabTitle': 'My IFFNFT',
  // IFFNFTMyNFT
  'overview.iffNFTMyNFT.nftButtons.view': 'View',
  'overview.iffNFTMyNFT.nftButtons.memo': 'Memo',
  'overview.iffNFTMyNFT.memoModalTitle': 'Memo on IFFNFT',
  'overview.iffNFTMyNFT.memoModalLabel.memo': 'Write a memo',
  'overview.iffNFTMyNFT.memoModalLabel.info': 'Add KYC info',
  'overview.iffNFTMyNFT.memoModalLabel.chain': 'On chain',
  'overview.iffNFTMyNFT.memoModalRadio.yes': 'Yes',
  'overview.iffNFTMyNFT.memoModalRadio.no': 'No',
  'overview.iffNFTMyNFT.memoModalButton.cancel': 'CANCEL',
  'overview.iffNFTMyNFT.memoModalButton.ok': 'OK',
  'overview.iffNFTMyNFT.memoModalPoweredBy': 'Powered by',
  // PanelKYCRecord
  'overview.panelKYCRecord.tabTitle': 'My KYC Record',
  'overview.panelKYCRecord.date': 'Date',
  'overview.panelKYCRecord.holder': 'Holder',
} as const

export type OverviewTranslation = Readonly<
  Record<keyof typeof Overview, string>
>
