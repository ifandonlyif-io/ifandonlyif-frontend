import { OverviewLayout } from 'components/Layouts'
import {
  PanelIFFNFT,
  PanelKYCRecord,
  PanelMintIt,
  PanelOverview,
  PanelPreMint,
} from 'components/pages/Overview'
import { Tab, TabList, TabPanel, Tabs } from 'components/Tabs'
import { useRouter } from 'next/router'
import React from 'react'
import { NextPageWithLayout } from 'types'

type TabData = {
  label: string
  href: string
}

const tabs: TabData[] = [
  { label: 'OVERVIEW', href: '#overview' },
  { label: 'MINT IT', href: '#mint-it' },
  { label: 'PREMINT NFT', href: '#premint-nft' },
  { label: 'IFFNFT', href: '#iffnft' },
  { label: 'KYC RECORD', href: '#kyc-record' },
]

const Overview: NextPageWithLayout = () => {
  const router = useRouter()
  const [tabIndex, setTabIndex] = React.useState(0)
  const handleTabSelect = React.useCallback(
    (index: number) => {
      setTabIndex(index)
      router.push(tabs[index].href)
    },
    [router]
  )

  React.useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (!hash) return
    const tabIndex = tabs.findIndex((tab) => tab.href === `#${hash}`)
    setTabIndex(tabIndex)
  }, [router.asPath])

  return (
    <div className="px-[30px] mt-16 bg-white rounded-b-[10px] shadow-iff-overview">
      <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.href}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanel>
          <PanelOverview />
        </TabPanel>
        <TabPanel>
          <PanelMintIt />
        </TabPanel>
        <TabPanel>
          <PanelPreMint />
        </TabPanel>
        <TabPanel>
          <PanelIFFNFT />
        </TabPanel>
        <TabPanel>
          <PanelKYCRecord />
        </TabPanel>
      </Tabs>
    </div>
  )
}

Overview.getLayout = (page) => {
  return <OverviewLayout>{page}</OverviewLayout>
}

export default Overview
