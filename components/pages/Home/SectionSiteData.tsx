import React from 'react'
import { useCountUp } from 'react-countup'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type SiteDataProps = BaseComponent & {
  title: string
  value: number
}

function SiteData(props: SiteDataProps) {
  const { className, title, value } = props
  const countUpRef = React.useRef(null)
  useCountUp({ ref: countUpRef, end: value, duration: 1, separator: ',' })
  return (
    <div className={classNames('block site-data', className)}>
      <div className="flex flex-row flex-nowrap">
        <div className="flex w-full flex-col gap-[6px] px-[34px] text-center">
          <h3 className="heading-6 text-shadow-heading-6 text-white">
            {title}
          </h3>
          <p
            className="heading-1 text-shadow-heading-1 text-white"
            ref={countUpRef}
          >
            {value}
          </p>
        </div>
        <div className="gap-line mb-5 hidden h-[54px] w-[2px] self-end bg-iff-cyan" />
      </div>
    </div>
  )
}

export function SectionSiteData() {
  return (
    <section className="mb-16 grid w-full grid-cols-3 items-center rounded-[10px] bg-black/50 pt-12 pb-9">
      <SiteData title="KYC HOLDER" value={1356} />
      <SiteData title="WHITELIST" value={1432566} />
      <SiteData title="IFFNFT" value={5645243} />
    </section>
  )
}
