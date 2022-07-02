import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

export default {
  title: 'Components/Page/Overview',
  component: TabTitle,
} as ComponentMeta<typeof TabTitle>

export const TabTitleComponent: ComponentStory<typeof TabTitle> = (args) => (
  <TabTitle {...args} />
)
TabTitleComponent.args = {
  children: 'All You Can Mint',
}

export const SectionTitleComponent: ComponentStory<typeof SectionTitle> = (
  args
) => <SectionTitle {...args} />
SectionTitleComponent.args = {
  children: 'MY WHITELIST',
  count: 5,
  size: 'small',
}

export const SectionTitleWithSortTimezoneComponent: ComponentStory<
  typeof SectionTitleWithSortTimezone
> = (args) => (
  <div className="px-6">
    <SectionTitleWithSortTimezone {...args} />
  </div>
)
SectionTitleWithSortTimezoneComponent.args = {
  title: 'WHITELIST',
}
