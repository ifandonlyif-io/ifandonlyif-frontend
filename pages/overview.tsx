import type { GetServerSideProps } from 'next'
import React from 'react'

import { getEthToUsd, getGasPriceData } from '@/backend'
import { OverviewLayout } from '@/components/Layouts'
import {
  PanelIFFNFT,
  // PanelKYCRecord,
  PanelMintIt,
  type PanelMintItProperties,
  PanelOverview,
  type PanelOverviewProperties,
  // PanelPreMint,
  // PanelPreMintProps,
  SectionTitleWithSortTimezoneProvider,
} from '@/components/pages/Overview'
import { Tab, TabList, TabPanel, Tabs } from '@/components/Tabs'
import {
  useMinterIFFNFTs,
  useOverviewTab,
  useUserIFFNFTs,
  useUserNFTs,
} from '@/hooks'
import { useScopedI18n } from '@/locales'
import type { NextPageWithLayout } from '@/types'

interface OverviewProperties {
  overview: PanelOverviewProperties
  mintIt: Omit<PanelMintItProperties, 'myNFTs' | 'onMintIffNftClick'>
}

const Overview: NextPageWithLayout<OverviewProperties> = (
  properties: OverviewProperties,
) => {
  const { overview, mintIt } = properties
  const t = useScopedI18n('overview.tabData')
  const [tabs, tabIndex, handleTabSelect] = useOverviewTab()
  const [myNfts, myNftsLoading] = useUserNFTs()
  const [myIffNfts, myIffNftsLoading] = useUserIFFNFTs()
  const [minterIffNfts, minterIffNftsLoading] = useMinterIFFNFTs()

  return (
    <div className="my-10 rounded-b-xl bg-white shadow-iff-overview md:my-16 md:px-6 xl:px-8">
      <SectionTitleWithSortTimezoneProvider>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          <TabList>
            {tabs.map((tab) => (
              <Tab className="uppercase" key={tab.href}>
                {t(tab.label)}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <PanelOverview {...overview} />
          </TabPanel>
          <TabPanel>
            <PanelMintIt
              myWhitelist={mintIt.myWhitelist}
              preSaleWhitelist={mintIt.preSaleWhitelist}
              myNFTs={myNfts ?? []}
              myNFTsLoading={myNftsLoading}
            />
          </TabPanel>
          <TabPanel>
            <PanelIFFNFT
              myIFFNFTs={myIffNfts}
              minterIFFNFTs={minterIffNfts}
              isLoading={myIffNftsLoading || minterIffNftsLoading}
            />
          </TabPanel>
          {/* <TabPanel>
            <PanelPreMint {...preMint} />
          </TabPanel>
          <TabPanel>
            <PanelKYCRecord />
          </TabPanel> */}
        </Tabs>
      </SectionTitleWithSortTimezoneProvider>
    </div>
  )
}

Overview.getLayout = (page) => {
  return <OverviewLayout>{page}</OverviewLayout>
}

export const getServerSideProps: GetServerSideProps<
  OverviewProperties
> = async () => {
  const priceData = await getGasPriceData()
  const ethPrice = await getEthToUsd()
  const overview = { priceData, ethPrice }
  const mintIt = { myWhitelist: [], preSaleWhitelist: [] }
  return { props: { overview, mintIt } }
}

export default Overview
