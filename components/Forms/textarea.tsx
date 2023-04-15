import React from 'react'

import { classNames } from '@/utils'

type TextareaProperties = React.ComponentPropsWithoutRef<'textarea'> & {
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
}

export function StyledTextarea(properties: TextareaProperties) {
  const { className, forwardedRef, ...others } = properties
  return (
    <textarea
      className={classNames(
        'flex flex-row box-border',
        'bg-iff-cyan/10 border-[1px] border-solid border-iff-cyan',
        'w-full h-[88px] p-4 font-medium text-base text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className
      )}
      {...others}
      ref={forwardedRef}
    />
  )
}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaProperties, 'forwardedRef'>
>(function renderTextarea(properties, reference) {
  return <StyledTextarea {...properties} forwardedRef={reference} />
})
