import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NFTButton } from 'components/Buttons'
import { Fragment } from 'react'

import { NFTFrame } from '.'
import { HolderRecord, NFTCard } from './nftCard'

export default {
  title: 'Components/NFTs',
  component: NFTFrame,
} as ComponentMeta<typeof NFTFrame>

const Template: ComponentStory<typeof NFTFrame> = (args) => (
  <div className="bg-white p-5">
    <NFTFrame {...args} onHideClick={() => window.alert('Hide!')} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: 'NFT Project Name 01',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  unixEpoch: 1657864800,
  children: (
    <NFTButton onClick={() => window.alert('Click!')}>Pre-Mint</NFTButton>
  ),
}

export const Expired = Template.bind({})
Expired.args = {
  name: 'NFT Project Name 01',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  unixEpoch: 1652594400,
}

export const TwoButtons = Template.bind({})
TwoButtons.args = {
  name: 'NFT Project Name 01',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  unixEpoch: 1657864800,
  children: (
    <Fragment>
      <NFTButton
        outline
        size="small"
        className="!border-[#A585FF] !text-[#A585FF]"
        onClick={() => window.alert('Click!')}
      >
        View
      </NFTButton>
      <NFTButton
        size="small"
        className="!text-[#CBB9FF]"
        onClick={() => window.alert('Click!')}
      >
        Memo
      </NFTButton>
    </Fragment>
  ),
}

export const NFTCardComponent: ComponentStory<typeof NFTCard> = (args) => (
  <NFTCard {...args} />
)
const holderRecords: HolderRecord[] = [
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    unixEpoch: 1657864800,
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]
NFTCardComponent.args = {
  name: 'BORED APE YACHT CLUB',
  nftId: 797,
  nftType: 'ERC-721',
  imageUri: 'https://avatars.githubusercontent.com/u/11311364',
  kycEpoch: 1657864800,
  holderRecords,
  flipBack: false,
  validity: true,
}
