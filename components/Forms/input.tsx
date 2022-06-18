import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type InputProps = BaseComponent &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={classNames(
        'flex flex-row items-center box-border',
        'bg-iff-cyan/10 border-[1px] border-solid border-iff-cyan',
        'w-full h-11 px-4 font-medium text-base text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className
      )}
      {...props}
    />
  )
}
