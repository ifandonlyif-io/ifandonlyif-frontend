import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

type InputRadioProperties = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type FilterItemProperties = BaseComponent &
  Omit<InputRadioProperties, 'value'> &
  Required<Pick<InputRadioProperties, 'value'>> & {
    count?: number
  }

export function FilterItem(properties: FilterItemProperties) {
  const { className, children, id, name, value, count, ...input } = properties
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
      <span className="box-border rounded-[20px] border-[1px] border-solid border-iff-cyan px-6 py-[6px] text-sm font-bold text-iff-text hover:bg-iff-cyan/40 peer-checked:bg-iff-cyan">
        {children}
        {typeof count === 'number' && ` (${count})`}
      </span>
    </label>
  )
}

type FilterGroupProperties = BaseComponent & {
  children: React.ReactNode
  name: string
  defaultValue?: string
  onFilterChange: (value: string) => void
}

export function FilterGroup(properties: FilterGroupProperties) {
  const { className, children, name, defaultValue, onFilterChange } = properties
  const [filterValue, setFilterValue] = React.useState(defaultValue)
  const handleFilterItemChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { value } = event.target
      setFilterValue(value)
      onFilterChange(value)
    },
    [onFilterChange]
  )
  return (
    <div className={classNames('flex flex-row gap-3', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<InputRadioProperties>(child)) {
          const { props } = child
          const checked = filterValue === props.value
          return React.cloneElement(child, {
            ...props,
            name,
            checked,
            id: `filter-${name}-${index}`,
            onChange: handleFilterItemChange,
          })
        }
        return
      })}
    </div>
  )
}
