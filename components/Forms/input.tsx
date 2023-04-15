import React from 'react'

import { classNames } from '@/utils'

type InputProperties = React.ComponentPropsWithoutRef<'input'> & {
  forwardedRef: React.ForwardedRef<HTMLInputElement>
}

export function StyledInput(properties: InputProperties) {
  const { className, forwardedRef, ...others } = properties
  return (
    <input
      className={classNames(
        'flex flex-row items-center box-border',
        'bg-iff-cyan/10 border-[1px] border-solid border-iff-cyan',
        'w-full h-11 px-4 font-medium text-base text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className
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
