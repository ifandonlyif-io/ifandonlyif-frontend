import type { Meta, StoryObj } from '@storybook/react'

import {
  NeonBorder,
  NeonCorner,
  NeonLine,
  NeonRhombus,
  NeonUnderline,
} from './index'

const meta: Meta<typeof NeonBorder> = {
  title: 'Components/Decorate',
  component: NeonBorder,
  tags: ['autodocs'],
}

export default meta

type NeonCornerStory = StoryObj<typeof NeonCorner>

export const NeonCornerComponent: NeonCornerStory = {
  render: () => <NeonCorner />,
}

type NeonRhombusStory = StoryObj<typeof NeonRhombus>

export const NeonRhombusComponent: NeonRhombusStory = {
  render: () => <NeonRhombus />,
}

type NeonLineStory = StoryObj<typeof NeonLine>

export const NeonLineComponent: NeonLineStory = {
  render: () => <NeonLine />,
}

type Story = StoryObj<typeof NeonBorder>

export const NeonBorderCyan: Story = {
  args: {
    flip: false,
    color: 'cyan',
  },
}

export const NeonBorderPurple: Story = {
  args: {
    flip: false,
    color: 'purple',
  },
}

type NeonUnderlineStory = StoryObj<typeof NeonUnderline>

export const NeonUnderlineCyan: NeonUnderlineStory = {
  render: () => <NeonUnderline />,
}
