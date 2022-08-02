import { getDemoNftList } from 'backend'
import { OverviewLayout } from 'components/Layouts'
import {
  PanelIFFNFT,
  PanelIFFNFTProps,
  PanelKYCRecord,
  PanelMintIt,
  PanelMintItProps,
  PanelOverview,
  PanelPreMint,
  PanelPreMintProps,
  SectionTitleWithSortTimezoneProvider,
} from 'components/pages/Overview'
import { Tab, TabList, TabPanel, Tabs } from 'components/Tabs'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { NextPageWithLayout } from 'types'

type OverviewProps = {
  mintIt: PanelMintItProps
  preMint: PanelPreMintProps
  iffNFT: PanelIFFNFTProps
}

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

const Overview: NextPageWithLayout<OverviewProps> = (props: OverviewProps) => {
  const { mintIt, preMint, iffNFT } = props
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
    <div className="my-10 rounded-b-[10px] bg-white shadow-iff-overview md:my-16 md:px-[24px] xl:px-[30px]">
      <SectionTitleWithSortTimezoneProvider>
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
            <PanelMintIt {...mintIt} />
          </TabPanel>
          <TabPanel>
            <PanelPreMint {...preMint} />
          </TabPanel>
          <TabPanel>
            <PanelIFFNFT {...iffNFT} />
          </TabPanel>
          <TabPanel>
            <PanelKYCRecord />
          </TabPanel>
        </Tabs>
      </SectionTitleWithSortTimezoneProvider>
    </div>
  )
}

Overview.getLayout = (page) => {
  return <OverviewLayout>{page}</OverviewLayout>
}

export const getServerSideProps: GetServerSideProps<
  OverviewProps
> = async () => {
  const mintIt = await getDemoNftList()
  const preMint: PanelPreMintProps = { preMintWhitelist: mintIt.myWhitelist }
  const iffNFT: PanelIFFNFTProps = { myIFFNFT: mintIt.myNFT }
  return { props: { mintIt, preMint, iffNFT } }
}

export default Overview
