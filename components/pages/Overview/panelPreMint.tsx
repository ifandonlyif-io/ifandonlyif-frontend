import { SectionTitle, SectionTitleWithSortTimezone, TabTitle } from './title'

export function PanelPreMint() {
  return (
    <div className="py-[50px] px-5 min-h-[640px]">
      <TabTitle className="mb-4">Pre-mint NFT</TabTitle>
      <SectionTitleWithSortTimezone
        className="mb-4"
        onOptionChange={() => void 0}
      />
      <section className="flex flex-col">
        <SectionTitle className="mb-[10px] uppercase" size="small" count={5}>
          MY WHITELIST
        </SectionTitle>
      </section>
    </div>
  )
}
