import { BaseComponent } from 'types'
import { classNames } from 'utils'

type SiteDataProps = BaseComponent & {
  title: string
  value: string | number
}

function SiteData(props: SiteDataProps) {
  const { className, title, value } = props
  return (
    <div className={classNames('block site-data', className)}>
      <div className="flex flex-row flex-nowrap">
        <div className="flex flex-col gap-[6px] px-[34px] w-full text-center">
          <h3 className="text-white heading-6 text-shadow-heading-6">
            {title}
          </h3>
          <p className="text-white heading-1 text-shadow-heading-1">{value}</p>
        </div>
        <div className="hidden self-end mb-5 w-[2px] h-[54px] bg-iff-cyan gap-line" />
      </div>
    </div>
  )
}

export function SectionSiteData() {
  return (
    <section className="grid grid-cols-3 items-center pt-12 pb-9 mb-16 w-full bg-black/50 rounded-[10px]">
      <SiteData title="KYC HOLDER" value={1356} />
      <SiteData title="WHITELIST" value={1432566} />
      <SiteData title="IFFNFT" value={5645243} />
    </section>
  )
}
