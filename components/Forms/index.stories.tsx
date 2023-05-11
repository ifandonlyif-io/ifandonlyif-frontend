import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { FilterGroup, FilterItem } from './filter'
import { Input } from './input'
import { Radio, RadioGroup } from './radio'
import { type SelectMenuOption, SelectMenus } from './select-menus'
import { SortByTimezone } from './sort-by-timezone'
import { Textarea } from './textarea'

const DivElement = () => <div />

const meta: Meta<typeof DivElement> = {
  title: 'Components/Forms',
  component: DivElement,
}

export default meta

const defaultSelectOptions: SelectMenuOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Meta', value: 'meta' },
  { label: 'Microsoft', value: 'microsoft' },
]

export const SelectMenusComponent: StoryObj<typeof SelectMenus> = {
  args: {
    placeholder: 'Please select',
    options: defaultSelectOptions,
    onOptionChange: (option) => window.alert(option.value),
  },
  render: (arguments_) => (
    <div className="w-80">
      <SelectMenus {...arguments_} />
    </div>
  ),
}

export const InputComponent: StoryObj<typeof Input> = {
  args: {
    placeholder: '#',
  },
  render: (arguments_) => (
    <div className="w-80">
      <Input {...arguments_} />
    </div>
  ),
}

const TextareaWithHooks = () => {
  const [value, setValue] = React.useState('')
  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target
      const trimWhitespaceValue = value.replaceAll(/\s/g, '')
      setValue(trimWhitespaceValue)
    },
    []
  )

  return (
    <div className="w-80">
      <Textarea
        className="[resize:none]"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  )
}

export const TextareaComponent: StoryObj<typeof Textarea> = {
  render: () => <TextareaWithHooks />,
}

export const RadioComponent: StoryObj<typeof Radio> = {
  args: {
    id: 'radio-email',
    name: 'contact',
    value: 'email',
    checked: false,
    children: 'Email',
  },
}

export const RadioGroupComponent: StoryObj<typeof RadioGroup> = {
  args: {
    name: 'contact',
  },
  render: (arguments_) => (
    <RadioGroup {...arguments_}>
      <Radio value="email">Email</Radio>
      <Radio value="phone">Phone</Radio>
      <Radio value="fax">Fax</Radio>
    </RadioGroup>
  ),
}

export const FilterGroupComponent: StoryObj<typeof FilterGroup> = {
  args: {
    name: 'nftType',
  },
  render: (arguments_) => (
    <FilterGroup {...arguments_}>
      <FilterItem value="all" count={15}>
        ALL
      </FilterItem>
      <FilterItem value="whitelist" count={11}>
        WHITELIST
      </FilterItem>
      <FilterItem value="nft" count={4}>
        NFT
      </FilterItem>
    </FilterGroup>
  ),
}

export const SortByTimezoneComponent: StoryObj<typeof SortByTimezone> = {
  args: {
    onOptionChange: () => void 0,
  },
}
