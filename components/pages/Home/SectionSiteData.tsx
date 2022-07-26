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
        <div className="flex w-full flex-col gap-0.5 px-2.5 text-center md:gap-1.5 md:px-8">
          <h3 className="subtitle-3 md:heading-6 text-shadow-subtitle-3 md:text-shadow-heading-6 text-white">
            {title}
          </h3>
          <p
            className="subtitle-1 md:heading-1 text-shadow-subtitle-1 md:text-shadow-heading-1 text-white"
            ref={countUpRef}
          >
            {value}
          </p>
        </div>
        <div className="gap-line mb-1 hidden h-4 w-[1px] self-end bg-iff-cyan md:mb-5 md:h-[54px] md:w-0.5" />
      </div>
    </div>
  )
}

export function SectionSiteData() {
  return (
    <section className="mb-11 grid w-full grid-cols-3 items-center bg-black/50 pt-3.5 pb-3 md:mb-16 md:rounded-[10px] md:pt-12 md:pb-9">
      <SiteData title="KYC HOLDER" value={1356} />
      <SiteData title="WHITELIST" value={1432566} />
      <SiteData title="IFFNFT" value={5645243} />
    </section>
  )
}
