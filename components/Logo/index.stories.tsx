import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IFFCube as Cube, IFFLogo as Logo } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

export const IFFLogo: ComponentStory<typeof Logo> = () => <Logo />

export const IFFCube: ComponentStory<typeof Cube> = () => <Cube />
