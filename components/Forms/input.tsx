import React from 'react'

import { cn } from '@/utils'

type InputProperties = React.ComponentPropsWithoutRef<'input'> & {
  forwardedRef: React.ForwardedRef<HTMLInputElement>
}

export function StyledInput(properties: InputProperties) {
  const { className, forwardedRef, ...others } = properties
  return (
    <input
      className={cn(
        'box-border flex flex-row items-center',
        'border border-solid border-iff-cyan bg-iff-cyan/10',
        'h-11 w-full px-4 text-base font-medium text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className,
      )}
      {...others}
      ref={forwardedRef}
    />
  )
}

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<InputProperties, 'forwardedRef'>
>(function renderInput(properties, reference) {
  return <StyledInput {...properties} forwardedRef={reference} />
})
