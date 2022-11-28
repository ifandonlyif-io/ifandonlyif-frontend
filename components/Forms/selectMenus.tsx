import { SelectMenuArrowIcon } from 'components/Icons'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

export type SelectMenuOption = {
  label: string
  value: string
}

type SelectMenusProps = BaseComponent & {
  options: SelectMenuOption[]
  defaultValue?: SelectMenuOption
  placeholder?: string
  onOptionChange: (option: SelectMenuOption) => void
}

type SelectOptionProps = SelectMenuOption & {
  onOptionClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: SelectMenuOption
  ) => void
}

function SelectOption(props: SelectOptionProps) {
  const { onOptionClick, ...option } = props
  return (
    <div
      className={classNames(
        'flex flex-row items-center box-border cursor-pointer',
        'w-full h-11 px-4 font-medium text-base text-[#333333]',
        'bg-[#61eddc] hover:bg-iff-cyan border-[1px] border-solid',
        'border-transparent border-b-[#333333] last:border-b-transparent'
      )}
      key={`select-option-${option.value}`}
      onClick={(event) => onOptionClick(event, option)}
    >
      {option.label}
    </div>
  )
}

export function SelectMenus(props: SelectMenusProps) {
  const { className, defaultValue, options, placeholder, onOptionChange } =
    props
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
      className={classNames(
        'relative flex flex-row items-center box-border cursor-pointer',
        'bg-iff-cyan/10 border-[1px] border-solid border-iff-cyan text-iff-cyan',
        className
      )}
      onClick={handleToggleOptions}
    >
      <div
        className={classNames(
          'flex flex-row justify-between items-center gap-2',
          'w-full h-11 px-4 font-medium text-base'
        )}
      >
        {selectedOption?.label || placeholder}
        <SelectMenuArrowIcon htmlColor="#46FFE6" fontSize="inherit" />
      </div>
      <div
        className={classNames(
          'flex-col absolute top-full w-full',
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
