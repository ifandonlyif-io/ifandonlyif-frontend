import type { DeepString } from '@/types'

export const overview = {
  tabData: {
    overview: 'Overview',
    mintIt: 'Mint it',
    premintNft: 'Pre-mint NFT',
    iffNft: 'IFFNFT',
    kycRecord: 'KYC Record',
  },
  panelOverview: {
    tabTitle: 'Overview',
  },
  overviewStatus: {
    viewLabel: 'View',
    whitelist: {
      title: 'WHITELIST STATUS',
      expire: 'Expire Soon',
      preMint: 'Pre-mint Soon',
      all: 'All',
      alive: 'Alive',
      expired: 'Expired',
    },
    iffNfts: {
      title: 'IFFNFTs STATUS',
      recently: 'Recently Memoed',
      all: 'All',
      memoed: 'Memoed',
      fully: 'Fully On chain',
    },
    myNfts: {
      title: 'MY NFTs STATUS',
      all: 'All',
    },
  },
  overviewGas: {
    title: 'GAS PRICE',
    chartTitle: 'Average gas in last 30 minutes',
    yAxisTitle: 'Avg Gas (Gwei)',
    areaName: 'Gas (Gwei)',
    dateTime: 'Date & Time',
    value: 'Value',
  },
  overviewWallet: {
    title: 'MY WALLETs',
    totalBalance: 'Total Balance',
    toggleShow: 'Show',
    toggleHide: 'Hide',
  },
  overviewEmail: {
    title: 'EMAIL ADDRESS',
    labelDefault: 'Default',
    labelNotification: 'Notification',
  },
  overviewSocial: {
    title: 'SOCIAL CONNECT',
    labelVerified: 'Verified',
  },
  panelMintIt: {
    tabTitle: 'All You Can Mint',
    filterOption: {
      all: 'ALL',
      whitelist: 'WHITELIST',
      nft: 'NFT',
    },
  },
  mintItWhitelist: {
    title: 'Whitelist',
    myWhitelist: {
      name: 'My Whitelist',
      nftButton: 'Pre-Mint',
    },
    preSaleWhitelist: {
      name: 'Pre-Sale Whitelist',
      nftButton: 'View',
    },
  },
  mintItMyNFT: {
    title: 'My NFT',
    loading: 'Loading...',
    nftButton: 'Mint To IFFNFT',
    mintModalTitle: 'Mint {name}#{tokenId} to IFF NFT',
    mintModalLabel: {
      inputAddress: 'Mint to address',
      userInfo: 'User info',
    },
    mintModalInput: {
      inputAddress: 'Please input an address',
      userInfo: 'Please input an address',
    },
    mintModalMessage: {
      required: 'Please input an address',
      invalidAddress: 'Invalid address',
      invalidWallet: 'Address is not a wallet',
      notOwnAddress: 'Can not mint to own address',
      invalidTypeId: 'Invalid nft type id',
    },
    mintModalButton: {
      cancel: 'CANCEL',
      ok: 'OK',
    },
    processingModalTitle: 'Processing...',
    resultModalSuccess: {
      p1: 'You just had minted NFT successfully.',
      p2: 'Now you can go to check it or mint another one.',
    },
    resultModalError: {
      p1: 'Sorry! Something go wrong....',
      p2: 'Maybe your can try it again.',
    },
    resultModalButton: {
      another: 'Mint another',
      check: 'Check it',
      close: 'Close',
    },
  },
  panelPreMint: {
    tabTitle: 'Pre-mint NFT',
  },
  preMintWhitelist: {
    title: 'My Whitelist',
    nftButton: 'Go Mint',
  },
  panelIFFNFT: {
    tabTitle: 'My IFFNFT',
    loading: 'Loading...',
  },
  iffNFTMyNFT: {
    nftButtons: {
      burn: 'Burn',
      view: 'View',
      memo: 'Memo',
    },
    memoModalTitle: 'Memo on IFFNFT',
    memoModalLabel: {
      memo: 'Write a memo',
      info: 'Add KYC info',
      chain: 'On chain',
    },
    memoModalRadio: {
      yes: 'Yes',
      no: 'No',
    },
    memoModalButton: {
      cancel: 'CANCEL',
      ok: 'OK',
    },
    memoModalPoweredBy: 'Powered by',
  },
  panelKYCRecord: {
    tabTitle: 'My KYC Record',
    date: 'Date',
    holder: 'Holder',
  },
} as const

export type OverviewTranslation = DeepString<typeof overview>
