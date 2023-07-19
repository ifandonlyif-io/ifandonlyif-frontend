import React from 'react'

import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type Size = 'medium' | 'large'

type LabelProperties = BaseComponent &
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & {
    size?: Size
  }

const sizes: Record<Size, string> = {
  medium: 'rounded-[46px] px-4 py-1.5 text-[10px]',
  large: 'rounded-[20px] px-8 py-2 text-sm',
}

export function Label({
  className,
  size = 'medium',
  ...properties
}: React.PropsWithChildren<LabelProperties>) {
  return (
    <label
      className={cn(
        'flex flex-row flex-nowrap items-center justify-center font-bold uppercase text-iff-text',
        sizes[size],
        className,
      )}
      {...properties}
    />
  )
}
