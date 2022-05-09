import React from 'react'
import { classNames } from 'utils'

type Size = 'small' | 'medium' | 'large'

type Button = {
  className?: string
  primary?: boolean
  outline?: boolean
  size?: Size
  children: React.ReactNode
  onClick?: () => void
}

const sizes: Record<Size, string> = {
  small: 'h-9 border-1 text-sm font-medium text-[#00FFB2] text-shadow-button-3',
  medium: 'h-11 border-2 text-xl font-bold text-[#333333]',
  large: 'h-[50px] border-2 text-xl font-bold text-iff-cyan',
}

export function Button({
  className,
  primary = false,
  outline = false,
  size = 'medium',
  children,
  ...props
}: Button) {
  return (
    <button
      className={classNames(
        'flex justify-center items-center rounded w-full',
        primary
          ? 'bg-iff-purple border-iff-purple shadow-iff-button-2'
          : 'bg-iff-cyan border-iff-cyan shadow-iff-button',
        outline && 'bg-transparent',
        sizes[size],
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
