import { SelectMenuOption, SelectMenus } from 'components/Forms'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

export type SortByTimezoneProps = BaseComponent & {
  onOptionChange: (option: SelectMenuOption) => void
}

const defaultOptions: SelectMenuOption[] = [
  { label: 'UTC+8 Taiwan', value: 'UTC+8' },
]

export function SortByTimezone(props: SortByTimezoneProps) {
  const { className, onOptionChange } = props
  return (
    <label
      className={classNames(
        'flex flex-row flex-nowrap items-center',
        className
      )}
    >
      <div className="mr-4 text-base font-bold text-iff-text">Sort by</div>
      <SelectMenus
        className="min-w-[218px] !text-iff-text"
        placeholder="Please select"
        options={defaultOptions}
        defaultValue={defaultOptions[0]}
        onOptionChange={onOptionChange}
      />
    </label>
  )
}
