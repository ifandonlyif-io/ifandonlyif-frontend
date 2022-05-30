import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NFTButton } from 'components/Button'
import { Fragment } from 'react'

import { NFTFrame } from '.'

export default {
  title: 'Components/NFTs',
  component: NFTFrame,
} as ComponentMeta<typeof NFTFrame>

const Template: ComponentStory<typeof NFTFrame> = (args) => (
  <div className="p-5 bg-white">
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
        className="text-[#A585FF] border-[#A585FF]"
        onClick={() => window.alert('Click!')}
      >
        View
      </NFTButton>
      <NFTButton
        size="small"
        className="text-[#CBB9FF]"
        onClick={() => window.alert('Click!')}
      >
        Memo
      </NFTButton>
    </Fragment>
  ),
}
