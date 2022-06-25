import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type Size = 'medium' | 'large'

type LabelProps = BaseComponent &
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & {
    size?: Size
  }

const sizes: Record<Size, string> = {
  medium: 'rounded-[46px] px-4 py-[6px] text-[10px]',
  large: 'rounded-[20px] px-8 py-2 text-sm',
}

export function Label({
  className,
  size = 'medium',
  ...props
}: React.PropsWithChildren<LabelProps>) {
  return (
    <label
      className={classNames(
        'flex flex-row flex-nowrap text-iff-text font-bold justify-center items-center',
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
