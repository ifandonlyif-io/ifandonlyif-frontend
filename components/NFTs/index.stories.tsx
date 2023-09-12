import type { Meta, StoryObj } from '@storybook/react'
import { Fragment } from 'react'

import { NFTButton } from '@/components/Buttons'

import { NFTFrame } from '.'
import { type HolderRecord, NFTCard } from './nft-card'

const meta: Meta<typeof NFTFrame> = {
  title: 'Components/NFTs',
  component: NFTFrame,
  tags: ['autodocs'],
  render: (arguments_) => (
    <div className="bg-white p-5">
      <NFTFrame {...arguments_} />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof NFTFrame>

export const Default: Story = {
  args: {
    name: 'NFT Project Name 01',
    imageUri: 'https://avatars.githubusercontent.com/u/11311364',
    unixEpoch: 1_657_864_800,
    children: (
      <NFTButton
        onClick={() => {
          window.alert('Click!')
        }}
      >
        Pre-Mint
      </NFTButton>
    ),
  },
}

export const Expired: Story = {
  args: {
    name: 'NFT Project Name 01',
    imageUri: 'https://avatars.githubusercontent.com/u/11311364',
    unixEpoch: 1_652_594_400,
  },
}

export const TwoButtons: Story = {
  args: {
    name: 'NFT Project Name 01',
    imageUri: 'https://avatars.githubusercontent.com/u/11311364',
    unixEpoch: 1_657_864_800,
    children: (
      <Fragment>
        <NFTButton
          outline
          size="small"
          className="!border-iff-purple-light !text-iff-purple-light"
          onClick={() => {
            window.alert('Click!')
          }}
        >
          View
        </NFTButton>
        <NFTButton
          size="small"
          className="text-iff-purple-lighter"
          onClick={() => {
            window.alert('Click!')
          }}
        >
          Memo
        </NFTButton>
      </Fragment>
    ),
  },
}

const holderRecords: HolderRecord[] = [
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1_657_864_800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export const NFTCardComponent: StoryObj<typeof NFTCard> = {
  args: {
    name: 'BORED APE YACHT CLUB',
    tokenId: 797,
    tokenType: 'ERC-721',
    imageUri: 'https://avatars.githubusercontent.com/u/11311364',
    kycEpoch: 1_657_864_800,
    holderRecords,
    flipBack: false,
    validity: true,
  },
}
