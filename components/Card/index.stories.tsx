import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './index'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  render: (arguments_) => (
    <div className="bg-white p-10">
      <Card {...arguments_} />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof Card>

export const CardComponent: Story = {
  args: {
    className: 'w-96 h-60 flex justify-center items-center',
    children: 'Content',
    title: 'WHITELIST STATUS',
  },
}
