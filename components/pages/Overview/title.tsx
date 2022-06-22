import { NeonRhombus } from 'components/Decorate'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

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
      <div className="flex flex-row flex-nowrap justify-center items-center">
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
      {count && <p>&nbsp;({count})</p>}
    </div>
  )
}
