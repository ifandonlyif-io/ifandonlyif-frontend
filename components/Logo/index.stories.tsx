import type { Meta, StoryObj } from '@storybook/react'

import { IFFCube as Cube, IFFLogo as Logo } from './index'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
}

export default meta

type LogoStory = StoryObj<typeof Logo>

export const IFFLogo: LogoStory = {}

type CubeStory = StoryObj<typeof Cube>

export const IFFCube: CubeStory = {
  render: (arguments_) => <Cube {...arguments_} />,
}
