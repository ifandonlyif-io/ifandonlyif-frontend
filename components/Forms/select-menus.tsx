import React from 'react'

import { SelectMenuArrowIcon } from '@/components/Icons'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

export type SelectMenuOption = {
  label: string
  value: string
}

type SelectMenusProperties = BaseComponent & {
  options: SelectMenuOption[]
  defaultValue?: SelectMenuOption
  placeholder?: string | null
  onOptionChange: (option: SelectMenuOption) => void
}

type SelectOptionProperties = SelectMenuOption & {
  onOptionClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: SelectMenuOption
  ) => void
}

function SelectOption(properties: SelectOptionProperties) {
  const { onOptionClick, ...option } = properties
  return (
    <div
      className={cn(
        'box-border flex cursor-pointer flex-row items-center',
        'h-11 w-full px-4 text-base font-medium text-[#333333]',
        'border border-solid bg-[#61eddc] hover:bg-iff-cyan',
        'border-transparent border-b-[#333333] last:border-b-transparent'
      )}
      key={`select-option-${option.value}`}
      onClick={(event) => onOptionClick(event, option)}
    >
      {option.label}
    </div>
  )
}

export function SelectMenus(properties: SelectMenusProperties) {
  const { className, defaultValue, options, placeholder, onOptionChange } =
    properties
  const [optionsOpen, setOptionsOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<
    SelectMenuOption | undefined
  >(defaultValue)
  const handleToggleOptions = React.useCallback(() => {
    setOptionsOpen((open) => !open)
  }, [])
  const handleOptionClick = React.useCallback(
    (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      option: SelectMenuOption
    ) => {
      event.stopPropagation()
      setSelectedOption(option)
      setOptionsOpen(false)
      onOptionChange(option)
    },
    [onOptionChange]
  )

  return (
    <div
      className={cn(
        'relative box-border flex cursor-pointer flex-row items-center',
        'border border-solid border-iff-cyan bg-iff-cyan/10 text-iff-cyan',
        className
      )}
      onClick={handleToggleOptions}
    >
      <div
        className={cn(
          'flex flex-row items-center justify-between gap-2',
          'h-11 w-full px-4 text-base font-medium'
        )}
      >
        {selectedOption?.label || placeholder}
        <SelectMenuArrowIcon htmlColor="#46FFE6" fontSize="inherit" />
      </div>
      <div
        className={cn(
          'absolute top-full w-full flex-col',
          optionsOpen ? 'flex' : 'hidden'
        )}
      >
        <div className="z-10 max-h-64 w-full overflow-y-auto">
          {options.map((option) => (
            <SelectOption
              key={option.value}
              onOptionClick={handleOptionClick}
              {...option}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
