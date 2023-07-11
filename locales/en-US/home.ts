export const Home = {
  // SectionHeader
  'home.sectionHeader.heading': 'THE BEST WAY TO SOCIALLY SECURE YOUR NFTs',
  'home.sectionHeader.subheading':
    'A PLATFORM THAT ALLOW USERS TO IDENTITY SCAM.',
  'home.sectionHeader.joinButton': 'LAUNCH',
  // SectionSiteData
  'home.sectionSiteData.kycHolder': 'KYC HOLDER',
  'home.sectionSiteData.whitelist': 'WHITELIST',
  'home.sectionSiteData.iffNft': 'IFFNFT',
  // SectionNFTCheck
  'home.sectionNFTCheck.left': 'NFTs HOLDER CHECK',
  'home.sectionNFTCheck.right': 'FAKE SITES CHECK',
  'home.sectionNFTCheck.holderCheckPanel.heading':
    'Fill in the form then click OK -',
  'home.sectionNFTCheck.holderCheckPanel.okButton': 'OK',
  'home.sectionNFTCheck.holderCheckPanel.placeholder': 'NFT Project',
  'home.sectionNFTCheck.siteCheckPanel.heading': 'Key in website url -',
  'home.sectionNFTCheck.siteCheckPanel.okButton': 'OK',
  'home.sectionNFTCheck.siteCheckPanel.invalid_string':
    'Please enter a valid url',
  'home.sectionNFTCheck.siteCheckPanel.notHttp':
    'Url can only start with https:// or http://',
  'home.sectionNFTCheck.siteCheckPanel.containUserinfo':
    'Url cannot contain user info',
  'home.sectionNFTCheck.siteCheckPanel.notExists':
    'Url is not in the blocklist',
  'home.sectionNFTCheck.siteCheckPanel.isVerified': 'Url is verified as safe',
  'home.sectionNFTCheck.siteCheckPanel.isUnsafe': 'Url is verified as unsafe',
  // SectionUserFeedback
  'home.sectionUserFeedback.heading': 'USER FEEDBACK',
} as const

export type HomeTranslation = Readonly<Record<keyof typeof Home, string>>
