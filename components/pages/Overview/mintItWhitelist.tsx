import { SectionTitle, SectionTitleWithSortTimezone } from './title'

function MyWhitelist() {
  return (
    <div className="flex flex-col">
      <SectionTitle className="mb-[10px] uppercase" size="small" count={5}>
        MY WHITELIST
      </SectionTitle>
    </div>
  )
}

function PreSaleWhitelist() {
  return (
    <div className="flex flex-col">
      <SectionTitle className="mb-[10px] uppercase" size="small" count={6}>
        PRE-SALE WHITELIST
      </SectionTitle>
    </div>
  )
}

export function MintItWhitelist() {
  return (
    <section className="flex flex-col">
      <SectionTitleWithSortTimezone
        className="mb-5"
        title="WHITELIST"
        onOptionChange={() => void 0}
      />
      <div className="flex flex-col gap-16">
        <MyWhitelist />
        <PreSaleWhitelist />
      </div>
    </section>
  )
}
