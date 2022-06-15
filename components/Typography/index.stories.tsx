import { ComponentMeta } from '@storybook/react'

const DivElement = () => <div />

export default {
  title: 'Components/Typography',
  component: DivElement,
} as ComponentMeta<typeof DivElement>

export const Heading1 = () => (
  <h1 className="text-white heading-1 text-shadow-heading-1">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h1>
)

export const Heading2 = () => (
  <h2 className="text-[#DAFFFF] heading-2 text-shadow-heading-2">
    Effortless Abcdefg
  </h2>
)

export const Heading3 = () => (
  <h3 className="text-white heading-3 text-shadow-heading-3">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h3>
)

export const Heading4 = () => (
  <h4 className="text-white heading-4 text-shadow-heading-4">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h4>
)

export const Heading5 = () => (
  <h5 className="text-[#D9FFFA] heading-5 text-shadow-heading-5">
    A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
  </h5>
)

export const Heading6 = () => (
  <h6 className="text-white heading-6 text-shadow-heading-6">KYC HOLDER</h6>
)

export const Subtitle1 = () => (
  <p className="text-white subtitle-1 text-shadow-subtitle-1">1,432,566</p>
)

export const Subtitle2 = () => (
  <p className="text-[#D9FFFA] subtitle-2 text-shadow-subtitle-2">
    A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
  </p>
)

export const Subtitle3 = () => (
  <p className="text-white subtitle-3 text-shadow-subtitle-3">KYC HOLDER</p>
)
