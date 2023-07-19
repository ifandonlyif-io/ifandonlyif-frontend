import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Tab as RTab,
  TabList as RTabList,
  TabPanel as RTabPanel,
  Tabs as RTabs,
} from 'react-tabs'

import { Tab, TabList, TabPanel, Tabs, TabSwitchers } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Original: Story = {
  render: () => (
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
  ),
}

export const Wrapped: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab warned>Title 2</Tab>
      </TabList>
      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  ),
}

const TabsWithHook = () => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => {
        setTabIndex(index)
      }}
    >
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

export const Controlled: Story = {
  render: () => <TabsWithHook />,
}

type TabSwitchersStory = StoryObj<typeof TabSwitchers>

export const TabSwitch: TabSwitchersStory = {
  render: () => (
    <TabSwitchers
      switcherText={{ left: 'NFTs HOLDER CHECK', right: 'FAKE SITES CHECK' }}
    >
      <TabPanel>
        <h2 className="bg-white">Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2 className="bg-white">Any content 2</h2>
      </TabPanel>
    </TabSwitchers>
  ),
}
