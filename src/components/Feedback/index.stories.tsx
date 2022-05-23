import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UserFeedback } from './index'

export default {
  title: 'Components/Feedback',
  component: UserFeedback,
} as ComponentMeta<typeof UserFeedback>

export const UserFeedbackComponent: ComponentStory<
  typeof UserFeedback
> = () => (
  <UserFeedback
    avatarSrc="https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0"
    username="Kathryn Murphy"
  >
    The best way to protect your NFTs, using this solutions and you are free to
    connection the web3 world.
  </UserFeedback>
)
