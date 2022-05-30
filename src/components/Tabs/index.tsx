import { ButtonProps } from 'components/Button'
import React from 'react'
import type {
  ReactTabsFunctionComponent,
  TabPanelProps as RTabPanelProps,
  TabProps as RTabProps,
  TabsProps,
} from 'react-tabs'
import { Tab as RTab, TabList, TabPanel as RTabPanel, Tabs } from 'react-tabs'
import { classNames } from 'utils'

type TabProps = RTabProps & {
  warned?: boolean
}
const Tab: ReactTabsFunctionComponent<TabProps> = ({
  children,
  className,
  warned = false,
  ...props
}) => (
  <RTab
    className={classNames(
      'react-tabs__tab',
      warned && 'react-tabs__tab--warned',
      className
    )}
    {...props}
  >
    {children}
  </RTab>
)
Tab.tabsRole = 'Tab'

type TabPanelProps = RTabPanelProps
const TabPanel: ReactTabsFunctionComponent<TabPanelProps> = ({
  children,
  className,
  selected,
  ...props
}) => (
  <RTabPanel
    forceRender
    className={classNames(
      'react-tabs__tab-panel',
      selected && 'react-tabs__tab-panel--selected',
      className
    )}
    {...props}
  >
    {children}
  </RTabPanel>
)
TabPanel.tabsRole = 'TabPanel'

type TabSwitcherProps = RTabProps & Pick<ButtonProps, 'onClick'>
const TabSwitcher: ReactTabsFunctionComponent<TabSwitcherProps> = ({
  children,
  className,
  selected,
  ...props
}) => (
  <RTab
    className={classNames(
      'react-tabs__tab-switcher',
      selected ? 'text-[#333333] bg-iff-cyan' : 'text-iff-cyan bg-transparent',
      className
    )}
    selectedClassName="react-tabs__tab-switcher--selected"
    {...props}
  >
    {children}
  </RTab>
)
TabSwitcher.tabsRole = 'Tab'

type TabSwitcherText = {
  left: string
  right: string
}
type TabSwitchersProps = TabsProps & {
  switcherText: TabSwitcherText
}
const TabSwitchers: ReactTabsFunctionComponent<TabSwitchersProps> = ({
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

export { Tab, TabList, TabPanel, Tabs, TabSwitchers }
