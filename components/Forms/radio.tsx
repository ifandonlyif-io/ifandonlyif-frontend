import React from 'react'

import { CheckIcon } from '@/components/Icons'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type InputRadioProperties = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type RadioProperties = BaseComponent &
  Omit<InputRadioProperties, 'value'> &
  Required<Pick<InputRadioProperties, 'value'>>

export function Radio({
  className,
  children,
  id,
  name,
  value,
  ...input
}: RadioProperties) {
  return (
    <label className={cn('flex flex-row items-center', className)} htmlFor={id}>
      <input
        className="peer hidden"
        type="radio"
        id={id}
        name={name}
        value={value}
        {...input}
      />
      {/**
       * Use two checkbox element to show different state
       * because of Tailwind css `peer` use general sibling combinator
       */}
      <div className="input-checkbox hidden bg-iff-cyan peer-checked:flex">
        <CheckIcon htmlColor="#46FFE6" fontSize={14} />
      </div>
      <div className="input-checkbox flex bg-transparent peer-checked:hidden" />
      <span className="text-sm font-bold text-iff-cyan-dark peer-checked:text-black">
        {children}
      </span>
    </label>
  )
}

type RadioGroupProperties = BaseComponent & {
  children: React.ReactNode
  name: string
}

export function RadioGroup({
  className,
  children,
  name,
}: RadioGroupProperties) {
  return (
    <div className={cn('flex flex-row gap-10', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<HTMLInputElement>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            name,
            id: `radio-${name}-${index}`,
          })
        }
        return
      })}
    </div>
  )
}
