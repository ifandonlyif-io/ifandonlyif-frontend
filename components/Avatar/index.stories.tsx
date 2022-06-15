import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Avatar } from './index'

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const ImageAvatar = Template.bind({})
ImageAvatar.args = {
  size: 'medium',
  src: 'https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0',
}

export const PurpleImageAvatar = Template.bind({})
PurpleImageAvatar.args = {
  color: '#BED0FF',
  size: 'large',
  src: 'https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0',
}

export const TextAvatar = Template.bind({})
TextAvatar.args = {
  size: 'small',
  variant: 'text',
  src: 'Sia',
}
