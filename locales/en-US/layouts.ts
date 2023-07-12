export const Layouts = {
  'layouts.footer.heading': 'Disclaimer',
  'layouts.footer.content':
    'ifandonlyif.io is an information platform designed to provide users with necessary information and assistance. However, the ultimate decision-making rights and responsibilities lie solely with the users. We do not offer suggestions or recommendations for users regarding any specific actions or decisions. It is crucial for users to exercise their own judgment and carefully evaluate the risks involved before making any decisions based on the information provided on ifandonlyif.io.',
  'layouts.overview.login': 'Please login',
  'layouts.overview.heading': 'THE BEST WAY TO SOCIALLY SECURE YOUR NFTs',
  'layouts.userPanel.connectButton': 'Connect Metamask',
  'layouts.userPanel.disconnectButton': 'Sign Out',
} as const

export type LayoutsTranslation = Readonly<Record<keyof typeof Layouts, string>>
