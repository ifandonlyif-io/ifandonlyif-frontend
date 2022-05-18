import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IFFLogo as Logo } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TemplateIFFLogo: ComponentStory<typeof Logo> = () => <Logo />

export const IFFLogo = TemplateIFFLogo.bind({})
