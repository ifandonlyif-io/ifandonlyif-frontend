import React from 'react'
import { classNames } from 'utils'

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  forwardedRef: React.ForwardedRef<HTMLInputElement>
}

export function StyledInput(props: InputProps) {
  const { className, forwardedRef, ...others } = props
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
  Omit<InputProps, 'forwardedRef'>
>(function renderInput(props, ref) {
  return <StyledInput {...props} forwardedRef={ref} />
})
