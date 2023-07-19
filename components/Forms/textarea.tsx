import React from 'react'

import { cn } from '@/utils'

type TextareaProperties = React.ComponentPropsWithoutRef<'textarea'> & {
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
}

export function StyledTextarea(properties: TextareaProperties) {
  const { className, forwardedRef, ...others } = properties
  return (
    <textarea
      className={cn(
        'box-border flex flex-row',
        'border border-solid border-iff-cyan bg-iff-cyan/10',
        'h-[88px] w-full p-4 text-base font-medium text-iff-cyan',
        'placeholder:text-base placeholder:text-iff-cyan hover:outline-none focus:outline-none',
        className,
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
