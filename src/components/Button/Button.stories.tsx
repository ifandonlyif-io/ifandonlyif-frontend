import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './index'

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
