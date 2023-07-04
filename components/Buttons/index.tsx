import React from 'react'

import { cn } from '@/utils'

type Size = 'small' | 'medium' | 'large'

export type ButtonProperties = React.ComponentProps<'button'> & {
  primary?: boolean
  outline?: boolean
  shadow?: boolean
  size?: Size
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const sizes: Record<Size, string> = {
  small: 'h-9 border-1 text-sm font-medium text-[#00FFB2] text-shadow-button-3',
  medium: 'h-11 border-2 text-xl font-bold text-[#333333]',
  large:
    'h-11 md:h-[50px] border-2 text-base md:text-xl font-bold text-iff-cyan',
}

export function Button({
  className,
  primary = false,
  outline = false,
  shadow = true,
  size = 'medium',
  children,
  ...properties
}: ButtonProperties) {
  return (
    <button
      className={cn(
        'box-border flex w-full items-center justify-center rounded',
        sizes[size],
        primary
          ? 'border-iff-purple bg-iff-purple shadow-iff-button-2 hover:bg-iff-purple/90'
          : 'border-iff-cyan bg-iff-cyan shadow-iff-button hover:bg-iff-cyan/90',
        outline && 'border bg-transparent',
        !shadow && 'shadow-none',
        className
      )}
      type="button"
      {...properties}
    >
      {children}
    </button>
  )
}

type NFTButtonProperties = Omit<ButtonProperties, 'primary' | 'size'> & {
  size?: Exclude<Size, 'large'>
}

const nftSizes: Record<Exclude<Size, 'large'>, string> = {
  small: 'w-[70px]',
  medium: 'w-full',
}

export function NFTButton({
  children,
  className,
  outline,
  size = 'medium',
  ...properties
}: NFTButtonProperties) {
  return (
    <button
      className={cn(
        'flex flex-row items-center justify-center rounded border border-solid py-1',
        'text-center text-sm font-bold uppercase',
        outline
          ? 'border-iff-cyan bg-transparent text-[#14D6D6]'
          : 'bg-gradient-nft-button border-[#28425D] bg-[#182948] text-iff-cyan hover:bg-[#35536D]',
        nftSizes[size],
        className
      )}
      {...properties}
    >
      {children}
    </button>
  )
}
