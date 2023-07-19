import React from 'react'

import { NeonRhombus } from '@/components/Decorate'
import { type SelectMenuOption, SortByTimezone } from '@/components/Forms'
import { SortByTimezoneContext } from '@/context'
import { DefaultTimezone } from '@/data'
import { type BaseComponent } from '@/types'
import { cn } from '@/utils'

const defaultOption: SelectMenuOption = DefaultTimezone

type TabTitleProperties = BaseComponent

export function TabTitle(
  properties: React.PropsWithChildren<TabTitleProperties>,
) {
  const { className, children } = properties
  return (
    <div
      className={cn(
        'flex flex-row flex-nowrap items-end text-[32px] font-bold leading-[44px] text-iff-text',
        className,
      )}
    >
      <h2 className="mr-2">{children}</h2>
      <div className="flex flex-row flex-nowrap items-center justify-center">
        <NeonRhombus className="rotate-90" color="cyan" />
        <NeonRhombus className="rotate-90" color="cyan" />
        <NeonRhombus className="rotate-90" color="cyan" />
      </div>
    </div>
  )
}

type SectionTitleSize = 'medium' | 'small'
type SectionTitleProperties = BaseComponent & {
  count?: number
  size?: SectionTitleSize
}

const sectionTitleSizes: Record<SectionTitleSize, string> = {
  medium: 'text-2xl',
  small: 'text-base',
}

export function SectionTitle(
  properties: React.PropsWithChildren<SectionTitleProperties>,
) {
  const { className, children, count, size = 'medium' } = properties
  return (
    <div
      className={cn(
        'flex flex-row flex-nowrap items-center font-bold text-iff-text',
        sectionTitleSizes[size],
        className,
      )}
    >
      <h3>{children}</h3>
      {typeof count === 'number' && <p>&nbsp;({count})</p>}
    </div>
  )
}

interface SectionTitleWithSortTimezoneProviderProperties {
  children: React.ReactNode
}

export function SectionTitleWithSortTimezoneProvider(
  properties: SectionTitleWithSortTimezoneProviderProperties,
) {
  const { children } = properties
  const [timezone, setTimezone] =
    React.useState<SelectMenuOption>(defaultOption)
  const handleTimezoneChange = React.useCallback((option: SelectMenuOption) => {
    setTimezone(option)
  }, [])
  return (
    <SortByTimezoneContext.Provider
      value={{ zone: timezone, onTimezoneChange: handleTimezoneChange }}
    >
      {children}
    </SortByTimezoneContext.Provider>
  )
}

type SectionTitleWithSortTimezoneProperties = BaseComponent & {
  title?: string | null
}

export function SectionTitleWithSortTimezone(
  properties: SectionTitleWithSortTimezoneProperties,
) {
  const { className, title } = properties
  return (
    <div
      className={cn(
        'flex flex-col flex-nowrap md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <SectionTitle className="flex-1 uppercase" size="medium">
        {title}
      </SectionTitle>
      <SortByTimezoneContext.Consumer>
        {({ onTimezoneChange }) => (
          <SortByTimezone
            className="self-end md:self-center"
            defaultValue={defaultOption}
            onOptionChange={onTimezoneChange}
          />
        )}
      </SortByTimezoneContext.Consumer>
    </div>
  )
}
