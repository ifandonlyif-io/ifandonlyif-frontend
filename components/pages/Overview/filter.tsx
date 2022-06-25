import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type InputRadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type FilterItemProps = BaseComponent &
  Omit<InputRadioProps, 'value'> &
  Required<Pick<InputRadioProps, 'value'>> & {
    count?: number
  }

export function FilterItem(props: FilterItemProps) {
  const { className, children, id, name, value, count, ...input } = props
  return (
    <label
      className={classNames(
        'flex flex-row items-center cursor-pointer',
        className
      )}
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
      <span className="box-border py-[6px] px-6 text-sm font-bold text-iff-text peer-checked:bg-iff-cyan rounded-[20px] border-[1px] border-iff-cyan border-solid">
        {children}
        {count && ` (${count})`}
      </span>
    </label>
  )
}

type FilterGroupProps = BaseComponent & {
  children: React.ReactNode
  name: string
}

export function FilterGroup({ className, children, name }: FilterGroupProps) {
  return (
    <div className={classNames('flex flex-row gap-3', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<HTMLInputElement>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            name,
            id: `filter-${name}-${index}`,
          })
        }
        return null
      })}
    </div>
  )
}
