import type { Meta } from '@storybook/react'

const DivElement = () => <div />

const meta: Meta<typeof DivElement> = {
  title: 'Components/Typography',
  component: DivElement,
  tags: ['autodocs'],
}

export default meta

export const Heading1 = () => (
  <h1 className="heading-1 text-shadow-heading-1 text-white">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h1>
)

export const Heading2 = () => (
  <h2 className="heading-2 text-shadow-heading-2 text-[#DAFFFF]">
    Effortless Abcdefg
  </h2>
)

export const Heading3 = () => (
  <h3 className="heading-3 text-shadow-heading-3 text-white">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h3>
)

export const Heading4 = () => (
  <h4 className="heading-4 text-shadow-heading-4 text-white">
    THE BEST WAY TO DO 2FA ON WEB3 ERA
  </h4>
)

export const Heading5 = () => (
  <h5 className="heading-5 text-shadow-heading-5 text-[#D9FFFA]">
    A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
  </h5>
)

export const Heading6 = () => (
  <h6 className="heading-6 text-shadow-heading-6 text-white">KYC HOLDER</h6>
)

export const Subtitle1 = () => (
  <p className="subtitle-1 text-shadow-subtitle-1 text-white">1,432,566</p>
)

export const Subtitle2 = () => (
  <p className="subtitle-2 text-shadow-subtitle-2 text-[#D9FFFA]">
    A PROJECT THAT ALLOWS THAT USERS TO HAVE A BACKUPD/SECONDARY NFT.
  </p>
)

export const Subtitle3 = () => (
  <p className="subtitle-3 text-shadow-subtitle-3 text-white">KYC HOLDER</p>
)
