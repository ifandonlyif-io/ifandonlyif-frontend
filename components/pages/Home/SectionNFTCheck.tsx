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
        'bg-[#00183C]/50 backdrop-blur-[54px] rounded-b-[10px] px-5 md:px-32 py-10 md:py-12 min-h-[294px] md:min-h-[324px] mx-0.5',
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
    <section className="mb-16 block flex-row flex-nowrap items-center md:mb-24 md:flex">
      <NeonBorder className="hidden md:flex" color="cyan" />
      <div className="iff-glass-cyan py-7 shadow-iff-base md:-mx-8 md:flex-1 md:py-20">
        <TabSwitchers
          className="mx-4 md:mx-auto"
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
      <NeonBorder className="hidden md:flex" color="cyan" flip />
    </section>
  )
}