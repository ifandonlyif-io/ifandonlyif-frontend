import type {
  ReactTabsFunctionComponent,
  TabPanelProps as RTabPanelProperties,
  TabProps as RTabProperties,
} from 'react-tabs'
import { Tab as RTab, TabPanel as RTabPanel } from 'react-tabs'

import { cn } from '@/utils'

type TabProperties = RTabProperties & {
  warned?: boolean
}

export const Tab: ReactTabsFunctionComponent<TabProperties> = ({
  children,
  className,
  warned = false,
  ...properties
}) => (
  <RTab
    className={cn(
      'react-tabs__tab',
      warned && 'react-tabs__tab--warned',
      className,
    )}
    {...properties}
  >
    {children}
  </RTab>
)

Tab.tabsRole = 'Tab'

type TabPanelProperties = RTabPanelProperties

export const TabPanel: ReactTabsFunctionComponent<TabPanelProperties> = ({
  children,
  className,
  selected,
  ...properties
}) => (
  <RTabPanel
    forceRender
    className={cn(
      'react-tabs__tab-panel',
      selected && 'react-tabs__tab-panel--selected',
      className,
    )}
    {...properties}
  >
    {children}
  </RTabPanel>
)

TabPanel.tabsRole = 'TabPanel'

export { TabList, Tabs } from 'react-tabs'
