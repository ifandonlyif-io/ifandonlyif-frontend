import type {
  ReactTabsFunctionComponent,
  TabPanelProps as RTabPanelProps,
  TabProps as RTabProps,
} from 'react-tabs'
import { Tab as RTab, TabList, TabPanel as RTabPanel, Tabs } from 'react-tabs'
import { classNames } from 'utils'

type TabProps = RTabProps & {
  warned?: boolean
}

export const Tab: ReactTabsFunctionComponent<TabProps> = ({
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

export const TabPanel: ReactTabsFunctionComponent<TabPanelProps> = ({
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

export { TabList, Tabs }
