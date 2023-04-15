import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import useSWR from 'swr'

import {
  getDemoMyIffNft,
  getDemoNftList,
  getEthToUsd,
  getGasPriceData,
  getUserNft,
} from '@/backend'
import { OverviewLayout } from '@/components/Layouts'
import {
  // PanelIFFNFT,
  type PanelIFFNFTProperties,
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
import { useIffNftContract, useWeb3Account } from '@/hooks'
import type { MintIffNftFormData, NextPageWithLayout, NFTItem } from '@/types'
import { getIffNftTypeId, isEthersError } from '@/utils'

type OverviewProperties = {
  overview: PanelOverviewProperties
  mintIt: Omit<PanelMintItProperties, 'myNFTs' | 'onMintIffNftClick'>
  // preMint: PanelPreMintProps
  iffNFT: PanelIFFNFTProperties
}

type TabData = {
  label: string
  href: string
}

const tabs: TabData[] = [
  { label: 'overview', href: '#overview' },
  { label: 'mintIt', href: '#mint-it' },
  // { label: 'premintNft', href: '#premint-nft' },
  // { label: 'iffNft', href: '#iffnft' },
  // { label: 'kycRecord', href: '#kyc-record' },
]

const Overview: NextPageWithLayout<OverviewProperties> = (
  properties: OverviewProperties
) => {
  const { overview, mintIt } = properties
  const { t } = useTranslation('overview')
  const router = useRouter()
  const { provider } = useWeb3Account()
  const iffNftContract = useIffNftContract(provider)
  const { data: myNfts } = useSWR('/auth/fetchUserNft', getUserNft)

  const [tabIndex, setTabIndex] = React.useState(0)
  const handleTabSelect = React.useCallback(
    (index: number) => {
      setTabIndex(index)
      router.push(tabs[index].href)
    },
    [router]
  )

  const handleMintIffNftClick = React.useCallback(
    async (nft: NFTItem, data: MintIffNftFormData) => {
      try {
        if (!iffNftContract) return
        const { inputAddress, userInfo } = data
        const typeId = getIffNftTypeId(nft.name)
        if (typeId === null || typeof typeId !== 'number')
          return alert(
            t('overview.panelMintIt.mintItMyNFT.errorMessage.invalidTypeId')
          )

        const mint = await iffNftContract.mintNFT(
          inputAddress,
          typeId,
          userInfo
        )
        const receipt = await mint.wait()
        console.debug('handleMintIffNftClick', receipt.transactionHash)
        alert(`Mint transaction hash: ${receipt.transactionHash}`)
      } catch (error) {
        if (isEthersError(error)) {
          alert(`Mint error: ${error.reason}`)
        } else if (error instanceof Error) {
          alert(`Mint error: ${error.message}`)
        } else if (typeof error === 'string') {
          alert(`Mint error: ${error}`)
        }
      }
    },
    [iffNftContract, t]
  )

  React.useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (!hash) return
    const tabIndex = tabs.findIndex((tab) => tab.href === `#${hash}`)
    setTabIndex(tabIndex)
  }, [router.asPath])

  return (
    <div className="shadow-iff-overview my-10 rounded-b-[10px] bg-white md:my-16 md:px-[24px] xl:px-[30px]">
      <SectionTitleWithSortTimezoneProvider>
        <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
          <TabList>
            {tabs.map((tab) => (
              <Tab className="uppercase" key={tab.href}>
                {t(`overview.tabData.label.${tab.label}`)}
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
              myNFTs={myNfts || []}
              onMintIffNftClick={handleMintIffNftClick}
            />
          </TabPanel>
          {/* <TabPanel>
            <PanelIFFNFT {...iffNFT} />
          </TabPanel>
          <TabPanel>
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
> = async ({ locale = 'en-US' }) => {
  const i18n = await serverSideTranslations(locale, ['common', 'overview'])
  const priceData = await getGasPriceData()
  const ethPrice = await getEthToUsd()
  const overview = { priceData, ethPrice }
  const mintIt = await getDemoNftList()
  const myIFFNFT = await getDemoMyIffNft()
  // const preMint: PanelPreMintProps = { preMintWhitelist: mintIt.myWhitelist }
  const iffNFT: PanelIFFNFTProperties = { myIFFNFT }
  return { props: { ...i18n, overview, mintIt, iffNFT } }
}

export default Overview
