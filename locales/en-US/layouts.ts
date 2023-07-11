export const Layouts = {
  'layouts.footer.heading': 'Disclaimer',
  'layouts.footer.content':
    'ifandonlyif.io only provides the necessary information for users, it’s an assistance system but the decision making rights depends on the users. We are not doing any suggestions or recommendation for users. The users should carefully consider the risks before they make any decisions.',
  'layouts.overview.login': 'Please login',
  'layouts.overview.heading': 'THE BEST WAY TO SOCIALLY SECURE YOUR NFTs',
  'layouts.userPanel.connectButton': 'Connect Metamask',
  'layouts.userPanel.disconnectButton': 'Sign Out',
} as const

export type LayoutsTranslation = Readonly<Record<keyof typeof Layouts, string>>
