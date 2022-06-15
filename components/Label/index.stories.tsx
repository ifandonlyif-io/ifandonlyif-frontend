import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Label } from './index'

export default {
  title: 'Components/Label',
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Showcase = () => (
  <div className="flex flex-row gap-4 items-center">
    <Label className="bg-iff-cyan" size="large">
      VIEW
    </Label>
    <Label className="bg-[#FFC481]" size="medium">
      Notification
    </Label>
  </div>
)

export const DefaultLabel = Template.bind({})
DefaultLabel.args = {
  className: 'bg-[#FFC481]',
  children: 'Notification',
  size: 'medium',
}

export const LargeLabel = Template.bind({})
LargeLabel.args = {
  className: 'bg-iff-cyan',
  children: 'VIEW',
  size: 'large',
}
