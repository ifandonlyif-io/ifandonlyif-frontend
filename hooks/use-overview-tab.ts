import { useRouter } from 'next/router'
import React from 'react'

interface TabData {
  label: 'overview' | 'mintIt' | 'premintNft' | 'iffNft' | 'kycRecord'
  href: string
}

const tabs_: TabData[] = [
  { label: 'overview', href: '#overview' },
  { label: 'mintIt', href: '#mint-it' },
  { label: 'iffNft', href: '#iffnft' },
  // { label: 'premintNft', href: '#premint-nft' },
  // { label: 'kycRecord', href: '#kyc-record' },
]

export function useOverviewTab() {
  const router = useRouter()

  const tabs = React.useMemo<TabData[]>(() => tabs_, [])

  const [tabIndex, setTabIndex] = React.useState<number>(0)
  const handleTabSelect = React.useCallback(
    (index: number) => {
      setTabIndex(index)
      void router.push(tabs[index].href)
    },
    [router, tabs],
  )

  React.useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (!hash) return
    const tabIndex = tabs.findIndex((tab) => tab.href === `#${hash}`)
    setTabIndex(tabIndex)
  }, [router.asPath, tabs])

  return [tabs, tabIndex, handleTabSelect] as const
}
