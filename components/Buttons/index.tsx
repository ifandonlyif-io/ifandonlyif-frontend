import React from 'react'
import { classNames } from 'utils'

type Size = 'small' | 'medium' | 'large'

export type ButtonProps = React.ComponentProps<'button'> & {
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
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'flex justify-center items-center rounded w-full box-border',
        sizes[size],
        primary
          ? 'bg-iff-purple border-iff-purple shadow-iff-button-2'
          : 'bg-iff-cyan border-iff-cyan shadow-iff-button',
        outline && 'border-[1px] bg-transparent',
        !shadow && 'shadow-none',
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

type NFTButtonProps = Omit<ButtonProps, 'primary' | 'size'> & {
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
  ...props
}: NFTButtonProps) {
  return (
    <button
      className={classNames(
        'flex flex-row justify-center items-center py-1 rounded border-[1px] border-solid',
        'text-sm font-bold text-center uppercase',
        outline
          ? 'bg-transparent border-iff-cyan text-[#14D6D6]'
          : 'bg-[#182948] bg-gradient-nft-button border-[#28425D] text-iff-cyan',
        nftSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
