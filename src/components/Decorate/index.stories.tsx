import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NeonBorder, NeonCorner, NeonLine, NeonRhombus } from './index'

export default {
  title: 'Components/Decorate',
  component: NeonBorder,
} as ComponentMeta<typeof NeonBorder>

export const NeonCornerComponent: ComponentStory<typeof NeonCorner> = () => (
  <NeonCorner />
)

export const NeonRhombusComponent: ComponentStory<typeof NeonRhombus> = () => (
  <NeonRhombus />
)

export const NeonLineComponent: ComponentStory<typeof NeonLine> = () => (
  <NeonLine />
)

const Template: ComponentStory<typeof NeonBorder> = (args) => (
  <NeonBorder {...args} />
)

export const NeonBorderCyan = Template.bind({})
NeonBorderCyan.args = {
  className: '',
  flip: false,
  color: 'cyan',
}

export const NeonBorderPurple = Template.bind({})
NeonBorderPurple.args = {
  className: '',
  flip: false,
  color: 'purple',
}
