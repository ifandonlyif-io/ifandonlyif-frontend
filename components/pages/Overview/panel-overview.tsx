import { useTranslation } from 'next-i18next'
import React from 'react'

// import { OverviewEmail } from './overviewEmail'
import { OverviewGas, type OverviewGasProperties } from './overview-gas'
// import { OverviewSocial } from './overviewSocial'
import { OverviewStatus } from './overview-status'
import {
  OverviewWallet,
  type OverviewWalletProperties,
} from './overview-wallet'
import { TabTitle } from './title'

export type PanelOverviewProperties = OverviewGasProperties &
  OverviewWalletProperties

export function PanelOverview(properties: PanelOverviewProperties) {
  const { t } = useTranslation('overview')

  return (
    <div className="px-4 py-6 md:px-5 md:py-[50px]">
      <TabTitle className="mb-6 md:mb-12">
        {t('overview.panelOverview.tabTitle')}
      </TabTitle>
      <div className="flex flex-col gap-6 md:gap-14">
        <OverviewStatus />
        <OverviewGas {...properties} />
        <OverviewWallet {...properties} />
        {/* <OverviewEmail />
        <OverviewSocial /> */}
      </div>
    </div>
  )
}
