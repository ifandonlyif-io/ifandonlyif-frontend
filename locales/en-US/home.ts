import type { DeepString } from '@/types'

export const home = {
  sectionHeader: {
    heading: 'THE BEST WAY TO SOCIALLY SECURE YOUR NFTs',
    subheading: 'A PLATFORM THAT ALLOW USERS TO IDENTITY SCAM.',
    joinButton: 'LAUNCH',
  },
  sectionSiteData: {
    kycHolder: 'KYC HOLDER',
    whitelist: 'WHITELIST',
    iffNft: 'IFFNFT',
  },
  sectionNFTCheck: {
    left: 'NFTs HOLDER CHECK',
    right: 'FAKE SITES CHECK',
    holderCheckPanel: {
      heading: 'Fill in the form then click OK -',
      okButton: 'OK',
      placeholder: 'NFT Project',
    },
    siteCheckPanel: {
      heading: 'Key in website url -',
      okButton: 'OK',
      invalid_string: 'Please enter a valid url',
      notHttp: 'Url can only start with https:// or http://',
      containUserinfo: 'Url cannot contain user info',
      notExists: 'Url is not in the blocklist',
      isVerified: 'Url is verified as safe',
      isUnsafe: 'Url is verified as unsafe',
    },
  },
  sectionUserFeedback: {
    heading: 'USER FEEDBACK',
  },
} as const

export type HomeTranslation = DeepString<typeof home>
