import type { Meta, StoryObj } from '@storybook/react'

import { UserFeedback } from './index'

const meta: Meta<typeof UserFeedback> = {
  title: 'Components/Feedback',
  component: UserFeedback,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof UserFeedback>

export const UserFeedbackComponent: Story = {
  args: {
    avatarSrc:
      'https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0',
    username: 'Kathryn Murphy',
    children:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
}
