import React from 'react'
import type {
  ReactTabsFunctionComponent,
  TabProps,
  TabsProps,
} from 'react-tabs'
import { Tab, TabList, Tabs } from 'react-tabs'

import type { ButtonProperties } from '@/components/Buttons'
import { cn } from '@/utils'

type TabSwitcherProperties = TabProps & Pick<ButtonProperties, 'onClick'>

const TabSwitcher: ReactTabsFunctionComponent<TabSwitcherProperties> = ({
  children,
  className,
  selected,
  ...properties
}) => (
  <Tab
    className={cn(
      'react-tabs__tab-switcher',
      selected
        ? 'bg-iff-cyan text-[#333333]'
        : 'bg-transparent text-iff-cyan hover:bg-iff-cyan/10',
      className,
    )}
    selectedClassName="react-tabs__tab-switcher--selected"
    {...properties}
  >
    {children}
  </Tab>
)

TabSwitcher.tabsRole = 'Tab'

interface TabSwitcherText {
  left: string
  right: string
}

type TabSwitchersProperties = TabsProps & {
  switcherText: TabSwitcherText
}

export const TabSwitchers: ReactTabsFunctionComponent<
  TabSwitchersProperties
> = ({ children, className, switcherText, ...properties }) => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs
      className={cn('react-tabs__tab-switchers', className)}
      selectedIndex={tabIndex}
      onSelect={(index) => {
        setTabIndex(index)
      }}
      {...properties}
    >
      <TabList className="react-tabs__tab-switcher-list">
        <TabSwitcher selected={tabIndex === 0} className="mr-[-2px]">
          {switcherText.left}
        </TabSwitcher>
        <TabSwitcher selected={tabIndex === 1}>
          {switcherText.right}
        </TabSwitcher>
      </TabList>
      {children}
    </Tabs>
  )
}

TabSwitchers.tabsRole = 'Tabs'
