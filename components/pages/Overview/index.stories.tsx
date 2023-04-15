import type { Meta, StoryObj } from '@storybook/react'

import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Page/Overview',
  component: TabTitle,
  tags: ['autodocs'],
}

export default meta

export const TabTitleComponent: StoryObj<typeof TabTitle> = {
  args: {
    children: 'All You Can Mint',
  },
}

export const SectionTitleComponent: StoryObj<typeof SectionTitle> = {
  args: {
    children: 'MY WHITELIST',
    count: 5,
    size: 'small',
  },
}

export const SectionTitleWithSortTimezoneComponent: StoryObj<
  typeof SectionTitleWithSortTimezone
> = {
  args: {
    title: 'WHITELIST',
  },
  render: (arguments_) => (
    <div className="px-6">
      <SectionTitleWithSortTimezone {...arguments_} />
    </div>
  ),
}
