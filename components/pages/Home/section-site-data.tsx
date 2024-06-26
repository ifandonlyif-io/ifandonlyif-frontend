import React from 'react'
import { useCountUp } from 'react-countup'

import { useScopedI18n } from '@/locales'
import type { BaseComponent, IffNftMeta } from '@/types'
import { cn } from '@/utils'

type SiteDataProperties = BaseComponent & {
  title: string
  value: number
}

function SiteData(properties: SiteDataProperties) {
  const { className, title, value } = properties
  const countUpReference = React.useRef(null)
  useCountUp({ ref: countUpReference, end: value, duration: 1, separator: ',' })
  return (
    <div className={cn('site-data block', className)}>
      <div className="flex flex-row flex-nowrap">
        <div className="flex w-full flex-col gap-0.5 px-2.5 text-center md:gap-1.5 md:px-8">
          <h3 className="subtitle-3 md:heading-6 text-shadow-subtitle-3 md:text-shadow-heading-6 uppercase text-white">
            {title}
          </h3>
          <p
            className="subtitle-1 md:heading-1 text-shadow-subtitle-1 md:text-shadow-heading-1 text-white"
            ref={countUpReference}
          >
            {value}
          </p>
        </div>
        <div className="gap-line mb-1 hidden h-4 w-px self-end bg-iff-cyan md:mb-5 md:h-[54px] md:w-0.5" />
      </div>
    </div>
  )
}

export interface SectionSiteDataProperties {
  iffNftMeta: IffNftMeta
}

export function SectionSiteData(properties: SectionSiteDataProperties) {
  const { iffNftMeta } = properties
  const t = useScopedI18n('home.sectionSiteData')
  const totalSupply = React.useMemo<number>(() => {
    const total = iffNftMeta?.contractMetadata?.totalSupply
    const totalNumber = Number.parseInt(total, 10)
    return Number.isNaN(totalNumber) ? 0 : totalNumber
  }, [iffNftMeta?.contractMetadata?.totalSupply])

  return (
    <section
      className={cn(
        // 'grid grid-cols-3 items-center',
        'flex items-center justify-center',
        'mb-11 w-full bg-black/50 pb-3 pt-3.5',
        'md:mb-16 md:rounded-xl md:pb-9 md:pt-12',
      )}
    >
      {/* <SiteData title={t('kycHolder')} value={1356} />
      <SiteData title={t('whitelist')} value={1_432_566} /> */}
      <SiteData title={t('iffNft')} value={totalSupply} />
    </section>
  )
}
