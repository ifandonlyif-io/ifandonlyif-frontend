import { CheckIcon } from 'components/Icons'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type InputRadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type RadioProps = BaseComponent &
  Omit<InputRadioProps, 'value'> &
  Required<Pick<InputRadioProps, 'value'>>

export function Radio({
  className,
  children,
  id,
  name,
  value,
  ...input
}: RadioProps) {
  return (
    <label
      className={classNames('flex flex-row items-center', className)}
      htmlFor={id}
    >
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
      <div className="hidden peer-checked:flex bg-iff-cyan input-checkbox">
        <CheckIcon htmlColor="#46FFE6" fontSize={14} />
      </div>
      <div className="flex peer-checked:hidden bg-transparent input-checkbox" />
      <span className="text-sm font-bold text-[#14D6D6] peer-checked:text-black">
        {children}
      </span>
    </label>
  )
}

type RadioGroupProps = BaseComponent & {
  children: React.ReactNode
  name: string
}

export function RadioGroup({ className, children, name }: RadioGroupProps) {
  return (
    <div className={classNames('flex flex-row gap-10', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            name,
            id: `radio-${name}-${index}`,
          })
        }
        return null
      })}
    </div>
  )
}
