import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type TextareaProps = BaseComponent &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={classNames(
        'flex flex-row box-border',
        'bg-[rgba(70,255,230,0.1)] border-[1px] border-solid border-iff-cyan',
        'w-full h-[88px] p-4 font-medium text-base text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className
      )}
      {...props}
    />
  )
}
