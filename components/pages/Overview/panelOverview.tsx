import React from 'react'

import { OverviewEmail } from './overviewEmail'
import { OverviewGas } from './overviewGas'
import { OverviewSocial } from './overviewSocial'
import { OverviewStatus } from './overviewStatus'
import { OverviewWallet } from './overviewWallet'
import { TabTitle } from './title'

export function PanelOverview() {
  return (
    <div className="py-[50px] px-5">
      <TabTitle className="mb-12">Overview</TabTitle>
      <div className="flex flex-col gap-14">
        <OverviewStatus />
        <OverviewGas />
        <OverviewWallet />
        <OverviewEmail />
        <OverviewSocial />
      </div>
    </div>
  )
}
