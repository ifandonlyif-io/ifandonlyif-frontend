import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

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
import { usePrivateFetch } from '@/hooks'
import { useScopedI18n } from '@/locales'
import type {
  FetchUserIffNftsResponse,
  FetchUserNftsResponse,
  NextPageWithLayout,
} from '@/types'
import { convertOwnedNftsToNftItems } from '@/utils'

interface OverviewProperties {
  overview: PanelOverviewProperties
  mintIt: Omit<PanelMintItProperties, 'myNFTs' | 'onMintIffNftClick'>
}

interface TabData {
  label: 'overview' | 'mintIt' | 'premintNft' | 'iffNft' | 'kycRecord'
  href: string
}

const tabs: TabData[] = [
  { label: 'overview', href: '#overview' },
  { label: 'mintIt', href: '#mint-it' },
  { label: 'iffNft', href: '#iffnft' },
  // { label: 'premintNft', href: '#premint-nft' },
  // { label: 'kycRecord', href: '#kyc-record' },
]

const Overview: NextPageWithLayout<OverviewProperties> = (
  properties: OverviewProperties,
) => {
  const { overview, mintIt } = properties
  const t = useScopedI18n('overview.tabData')
  const router = useRouter()
  const [fetch, onFetchError] = usePrivateFetch()
  const { data: myNfts, isLoading: myNftsLoading } = useSWR(
    '/auth/fetchUserNft',
    async (key) => {
      const response = await fetch<string>(key, { method: 'POST' })
      const parsedResponse = JSON.parse(response) as FetchUserNftsResponse
      return convertOwnedNftsToNftItems(parsedResponse.ownedNfts)
    },
    { onError: onFetchError },
  )
  const { data: myIffNfts, isLoading: myIffNftsLoading } = useSWR(
    '/auth/fetchUserIffNft',
    async (key) => {
      const response = await fetch<string>(key, { method: 'POST' })
      const parsedResponse = JSON.parse(response) as FetchUserIffNftsResponse
      return convertOwnedNftsToNftItems(parsedResponse.ownedNfts)
    },
    { onError: onFetchError },
  )

  const [tabIndex, setTabIndex] = React.useState(0)
  const handleTabSelect = React.useCallback(
    (index: number) => {
      setTabIndex(index)
      void router.push(tabs[index].href)
    },
    [router],
  )

  React.useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (!hash) return
    const tabIndex = tabs.findIndex((tab) => tab.href === `#${hash}`)
    setTabIndex(tabIndex)
  }, [router.asPath])

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
              myIFFNFT={myIffNfts ?? []}
              isLoading={myIffNftsLoading}
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
