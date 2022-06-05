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

export function SelectMenus({
  className,
  options,
  placeholder,
  onOptionChange,
}: SelectMenusProps) {
  const [optionsOpen, setOptionsOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<
    SelectMenuOption | undefined
  >()
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
        'bg-[rgba(70,255,230,0.1)] border-[1px] border-solid border-iff-cyan',
        className
      )}
      onClick={handleToggleOptions}
    >
      <div
        className={classNames(
          'flex flex-row justify-between items-center',
          'w-full h-11 px-4 font-medium text-base text-iff-cyan'
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
        {options.map((option) => (
          <div
            className={classNames(
              'flex flex-row items-center box-border cursor-pointer',
              'w-full h-11 px-4 font-medium text-base text-[#333333]',
              'bg-[#61eddc] hover:bg-iff-cyan border-[1px] border-solid border-transparent border-b-[#333333]'
            )}
            key={`select-option-${option.value}`}
            onClick={(event) => handleOptionClick(event, option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}