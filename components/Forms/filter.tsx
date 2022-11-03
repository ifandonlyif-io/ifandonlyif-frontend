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
      <span className="box-border rounded-[20px] border-[1px] border-solid border-iff-cyan py-[6px] px-6 text-sm font-bold text-iff-text peer-checked:bg-iff-cyan">
        {children}
        {typeof count === 'number' && ` (${count})`}
      </span>
    </label>
  )
}

type FilterGroupProps = BaseComponent & {
  children: React.ReactNode
  name: string
  defaultValue?: string
  onFilterChange: (value: string) => void
}

export function FilterGroup(props: FilterGroupProps) {
  const { className, children, name, defaultValue, onFilterChange } = props
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
        if (React.isValidElement<InputRadioProps>(child)) {
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
        return null
      })}
    </div>
  )
}
