import type { DeepString } from '@/types'

export const layouts = {
  disclaimer: {
    heading: 'Disclaimer',
    content:
      'ifandonlyif.io is an information platform designed to provide users with necessary information and assistance. However, the ultimate decision-making rights and responsibilities lie solely with the users. We do not offer suggestions or recommendations for users regarding any specific actions or decisions. It is crucial for users to exercise their own judgment and carefully evaluate the risks involved before making any decisions based on the information provided on ifandonlyif.io.',
  },
  footer: {
    follow: 'Follow us on',
  },
  overview: {
    login: 'Please login',
    heading: 'THE BEST WAY TO SOCIALLY SECURE YOUR NFTs',
  },
  userPanel: {
    connectButton: 'Connect Metamask',
    disconnectButton: 'Sign Out',
    signInButton: 'Sign In',
    signInWithButton: 'Sign In with {address}',
  },
} as const

export type LayoutsTranslation = DeepString<typeof layouts>
