import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Card } from './index'

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>

export const CardComponent: ComponentStory<typeof Card> = (args) => (
  <div className="p-10 bg-white">
    <Card {...args} />
  </div>
)
CardComponent.args = {
  className: 'w-96 h-60 flex justify-center items-center',
  children: 'Content',
  title: 'WHITELIST STATUS',
}
