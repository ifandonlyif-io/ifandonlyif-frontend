import { ButtonProps } from 'components/Buttons'
import React from 'react'
import type {
  ReactTabsFunctionComponent,
  TabProps,
  TabsProps,
} from 'react-tabs'
import { Tab, TabList, Tabs } from 'react-tabs'
import { classNames } from 'utils'

type TabSwitcherProps = TabProps & Pick<ButtonProps, 'onClick'>

const TabSwitcher: ReactTabsFunctionComponent<TabSwitcherProps> = ({
  children,
  className,
  selected,
  ...props
}) => (
  <Tab
    className={classNames(
      'react-tabs__tab-switcher',
      selected ? 'text-[#333333] bg-iff-cyan' : 'text-iff-cyan bg-transparent',
      className
    )}
    selectedClassName="react-tabs__tab-switcher--selected"
    {...props}
  >
    {children}
  </Tab>
)

TabSwitcher.tabsRole = 'Tab'

type TabSwitcherText = {
  left: string
  right: string
}

type TabSwitchersProps = TabsProps & {
  switcherText: TabSwitcherText
}

export const TabSwitchers: ReactTabsFunctionComponent<TabSwitchersProps> = ({
  children,
  className,
  switcherText,
  ...props
}) => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs
      className={classNames('react-tabs__tab-switchers', className)}
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      {...props}
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
