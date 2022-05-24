import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import {
  Tab as RTab,
  TabList as RTabList,
  TabPanel as RTabPanel,
  Tabs as RTabs,
} from 'react-tabs'

import { Tab, TabList, TabPanel, Tabs } from './index'

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>

/**
 * @TODO: current has a bug https://github.com/tailwindlabs/tailwindcss/issues/8424
 */
export const Default: ComponentStory<typeof RTabs> = () => (
  <RTabs>
    <RTabList>
      <RTab>Title 1</RTab>
      <RTab className="react-tabs__tab react-tabs__tab--warned">Title 2</RTab>
    </RTabList>
    <RTabPanel>
      <h2>Any content 1</h2>
    </RTabPanel>
    <RTabPanel>
      <h2>Any content 2</h2>
    </RTabPanel>
  </RTabs>
)

export const Controlled: ComponentStory<typeof Tabs> = () => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab warned>Title 2</Tab>
      </TabList>
      <TabPanel selected={tabIndex === 0}>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel selected={tabIndex === 1}>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  )
}
