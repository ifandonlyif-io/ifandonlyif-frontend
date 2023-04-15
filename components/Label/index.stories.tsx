import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './index'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta

export const Showcase = () => (
  <div className="flex flex-row items-center gap-4">
    <Label className="bg-iff-cyan" size="large">
      VIEW
    </Label>
    <Label className="bg-[#FFC481]" size="medium">
      Notification
    </Label>
  </div>
)

type Story = StoryObj<typeof Label>

export const DefaultLabel: Story = {
  args: {
    className: 'bg-[#FFC481]',
    children: 'Notification',
    size: 'medium',
  },
}

export const LargeLabel: Story = {
  args: {
    className: 'bg-iff-cyan',
    children: 'VIEW',
    size: 'large',
  },
}
