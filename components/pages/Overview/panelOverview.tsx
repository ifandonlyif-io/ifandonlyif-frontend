import React from 'react'

import { OverviewEmail } from './overviewEmail'
import { OverviewGas } from './overviewGas'
import { OverviewSocial } from './overviewSocial'
import { OverviewStatus } from './overviewStatus'
import { OverviewWallet } from './overviewWallet'
import { TabTitle } from './title'

export function PanelOverview() {
  return (
    <div className="py-6 px-4 md:py-[50px] md:px-5">
      <TabTitle className="mb-6 md:mb-12">Overview</TabTitle>
      <div className="flex flex-col gap-6 md:gap-14">
        <OverviewStatus />
        <OverviewGas />
        <OverviewWallet />
        <OverviewEmail />
        <OverviewSocial />
      </div>
    </div>
  )
}
