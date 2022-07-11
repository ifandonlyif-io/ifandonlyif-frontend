import { Button } from 'components/Buttons'
import { NeonBorder } from 'components/Decorate'
import {
  Input,
  SelectMenuOption,
  SelectMenus,
  Textarea,
} from 'components/Forms'
import { TabPanel, TabSwitchers } from 'components/Tabs'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

const demoOptions: SelectMenuOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Meta', value: 'meta' },
  { label: 'Microsoft', value: 'microsoft' },
]

function CheckPanel(props: React.PropsWithChildren<BaseComponent>) {
  const { className, children } = props
  return (
    <div
      className={classNames(
        'bg-[#00183C]/50 backdrop-blur-[54px] rounded-[10px] px-32 py-12 min-h-[324px]',
        className
      )}
    >
      {children}
    </div>
  )
}

function HolderCheckPanel() {
  return (
    <CheckPanel>
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-bold text-white">
          Fill in the form then click OK -
        </h3>
        <SelectMenus
          placeholder="NFT Project"
          options={demoOptions}
          onOptionChange={() => void 0}
        />
        <Input placeholder="#" />
        <Button>OK</Button>
      </div>
    </CheckPanel>
  )
}

function SiteCheckPanel() {
  return (
    <CheckPanel>
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-bold text-white">Key in website url -</h3>
        <Textarea className="[resize:none]" />
        <Button>OK</Button>
      </div>
    </CheckPanel>
  )
}

export function SectionNFTCheck() {
  return (
    <section className="flex flex-row flex-nowrap items-center mb-24">
      <NeonBorder color="cyan" />
      <div className="flex-1 py-20 -mx-8 shadow-iff-base iff-glass-cyan">
        <TabSwitchers
          className="mx-auto"
          switcherText={{
            left: 'NFTs HOLDER CHECK',
            right: 'FAKE SITES CHECK',
          }}
        >
          <TabPanel>
            <HolderCheckPanel />
          </TabPanel>
          <TabPanel>
            <SiteCheckPanel />
          </TabPanel>
        </TabSwitchers>
      </div>
      <NeonBorder color="cyan" flip />
    </section>
  )
}
