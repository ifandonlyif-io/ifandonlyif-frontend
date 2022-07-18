import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button, NFTButton } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <div className="w-40">
    <Button {...args} onClick={() => window.alert('Click!')} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  size: 'large',
  children: 'JOIN NOW',
}

export const Secondary = Template.bind({})
Secondary.args = {
  size: 'medium',
  children: 'OK',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  outline: true,
  children: 'Connect Metamask',
}

const NFTTemplate: ComponentStory<typeof NFTButton> = (args) => (
  <div className="w-40 bg-white p-5">
    <NFTButton {...args} onClick={() => window.alert('Click!')} />
  </div>
)

export const NFTDefault = NFTTemplate.bind({})
NFTDefault.args = {
  children: 'Pre-mint',
}

export const NFTOutline = NFTTemplate.bind({})
NFTOutline.args = {
  children: 'View',
  outline: true,
}

export const NFTHide = NFTTemplate.bind({})
NFTHide.args = {
  children: 'Hide',
  className: '!text-[#FF906D] !border-[#FFC8A0]',
  outline: true,
}

export const NFTSmall = NFTTemplate.bind({})
NFTSmall.args = {
  children: 'Memo',
  className: '!text-[#CBB9FF]',
  size: 'small',
}

export const NFTSmallOutline = NFTTemplate.bind({})
NFTSmallOutline.args = {
  children: 'View',
  className: '!text-[#A585FF] !border-[#A585FF]',
  outline: true,
  size: 'small',
}
