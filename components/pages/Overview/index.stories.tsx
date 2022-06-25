import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FilterGroup, FilterItem } from './filter'
import { SortByTimezone } from './sort'
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

export const FilterGroupComponent: ComponentStory<typeof FilterGroup> = (
  args
) => (
  <FilterGroup {...args}>
    <FilterItem value="all" count={15}>
      ALL
    </FilterItem>
    <FilterItem value="whitelist" count={11}>
      WHITELIST
    </FilterItem>
    <FilterItem value="nft" count={4}>
      NFT
    </FilterItem>
  </FilterGroup>
)
FilterGroupComponent.args = {
  name: 'nftType',
}

export const SortByTimezoneComponent: ComponentStory<typeof SortByTimezone> = (
  args
) => <SortByTimezone {...args} />
SortByTimezoneComponent.args = {
  onOptionChange: () => void 0,
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
  onOptionChange: () => void 0,
}
