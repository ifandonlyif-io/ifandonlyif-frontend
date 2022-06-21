import { Card } from 'components/Card'

import { TabTitle } from './title'

export function PanelOverview() {
  return (
    <div className="py-[50px] px-5">
      <TabTitle className="mb-12">Overview</TabTitle>
      <section className="flex flex-row gap-14">
        <Card title="WHITELIST STATUS"></Card>
        <Card title="IFFNFTs STATUS"></Card>
      </section>
    </div>
  )
}
