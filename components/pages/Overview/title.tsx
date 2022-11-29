import { NeonRhombus } from 'components/Decorate'
import { SelectMenuOption, SortByTimezone } from 'components/Forms'
import { SortByTimezoneContext } from 'context'
import { DefaultTimezone } from 'data'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

const defaultOptuon: SelectMenuOption = DefaultTimezone

type TabTitleProps = BaseComponent

export function TabTitle(props: React.PropsWithChildren<TabTitleProps>) {
  const { className, children } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap items-end text-iff-text text-[32px] font-bold leading-[44px]',
        className
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
type SectionTitleProps = BaseComponent & {
  count?: number
  size?: SectionTitleSize
}

const sectionTitleSizes: Record<SectionTitleSize, string> = {
  medium: 'text-2xl',
  small: 'text-base',
}

export function SectionTitle(
  props: React.PropsWithChildren<SectionTitleProps>
) {
  const { className, children, count, size = 'medium' } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap items-center text-iff-text font-bold',
        sectionTitleSizes[size],
        className
      )}
    >
      <h3>{children}</h3>
      {typeof count === 'number' && <p>&nbsp;({count})</p>}
    </div>
  )
}

type SectionTitleWithSortTimezoneProviderProps = {
  children: React.ReactNode
}

export function SectionTitleWithSortTimezoneProvider(
  props: SectionTitleWithSortTimezoneProviderProps
) {
  const { children } = props
  const [timezone, setTimezone] =
    React.useState<SelectMenuOption>(defaultOptuon)
  const handleTimezoneChange = React.useCallback(
    (option: SelectMenuOption) => setTimezone(option),
    []
  )
  return (
    <SortByTimezoneContext.Provider
      value={{ zone: timezone, onTimezoneChange: handleTimezoneChange }}
    >
      {children}
    </SortByTimezoneContext.Provider>
  )
}

type SectionTitleWithSortTimezoneProps = BaseComponent & {
  title?: string | null
}

export function SectionTitleWithSortTimezone(
  props: SectionTitleWithSortTimezoneProps
) {
  const { className, title } = props
  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row flex-nowrap md:justify-between md:items-center',
        className
      )}
    >
      <SectionTitle className="flex-1 uppercase" size="medium">
        {title}
      </SectionTitle>
      <SortByTimezoneContext.Consumer>
        {({ onTimezoneChange }) => (
          <SortByTimezone
            className="self-end md:self-center"
            defaultValue={defaultOptuon}
            onOptionChange={onTimezoneChange}
          />
        )}
      </SortByTimezoneContext.Consumer>
    </div>
  )
}
