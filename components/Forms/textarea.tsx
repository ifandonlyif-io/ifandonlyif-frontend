import React from 'react'
import { classNames } from 'utils'

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
}

export function StyledTextarea(props: TextareaProps) {
  const { className, forwardedRef, ...others } = props
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
  Omit<TextareaProps, 'forwardedRef'>
>(function renderTextarea(props, ref) {
  return <StyledTextarea {...props} forwardedRef={ref} />
})
