import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './index'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const ImageAvatar: Story = {
  args: {
    size: 'medium',
    src: 'https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0',
  },
}

export const PurpleImageAvatar: Story = {
  args: {
    color: '#BED0FF',
    size: 'large',
    src: 'https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0',
  },
}

export const TextAvatar: Story = {
  args: {
    size: 'small',
    variant: 'text',
    src: 'Sia',
  },
}
