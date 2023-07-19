import type { Meta, StoryObj } from '@storybook/react'

import { Button, NFTButton } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  render: (arguments_) => (
    <div className="w-40">
      <Button
        {...arguments_}
        onClick={() => {
          window.alert('Click!')
        }}
      />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    primary: true,
    size: 'large',
    children: 'JOIN NOW',
  },
}

export const Secondary: Story = {
  args: {
    size: 'medium',
    children: 'OK',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    outline: true,
    children: 'Connect Metamask',
  },
}

type NFTButtonStory = StoryObj<typeof NFTButton>

const renderNFTButton: NFTButtonStory['render'] = (arguments_) => (
  <div className="w-40">
    <NFTButton
      {...arguments_}
      onClick={() => {
        window.alert('Click!')
      }}
    />
  </div>
)

export const NFTDefault: NFTButtonStory = {
  args: {
    children: 'Pre-mint',
  },
  render: renderNFTButton,
}

export const NFTOutline: NFTButtonStory = {
  args: {
    children: 'View',
    outline: true,
  },
  render: renderNFTButton,
}

export const NFTHide: NFTButtonStory = {
  args: {
    children: 'Hide',
    className: '!text-[#FF906D] !border-[#FFC8A0]',
    outline: true,
  },
  render: renderNFTButton,
}

export const NFTSmall: NFTButtonStory = {
  args: {
    children: 'Memo',
    className: '!text-[#CBB9FF]',
    size: 'small',
  },
  render: renderNFTButton,
}

export const NFTSmallOutline: NFTButtonStory = {
  args: {
    children: 'View',
    className: '!text-[#A585FF] !border-[#A585FF]',
    outline: true,
    size: 'small',
  },
  render: renderNFTButton,
}
