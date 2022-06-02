import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Input, SelectMenuOption, SelectMenus, Textarea } from './index'

export default {
  title: 'Components/Forms',
  component: SelectMenus,
} as ComponentMeta<typeof SelectMenus>

const defaultSelectOptions: SelectMenuOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Meta', value: 'meta' },
  { label: 'Microsoft', value: 'microsoft' },
]

export const SelectMenusComponent: ComponentStory<typeof SelectMenus> = () => (
  <div className="w-80">
    <SelectMenus
      placeholder="Please select"
      options={defaultSelectOptions}
      onOptionChange={(option) => window.alert(option.value)}
    />
  </div>
)

export const InputComponent: ComponentStory<typeof Input> = () => (
  <div className="w-80">
    <Input placeholder="#" />
  </div>
)

export const TextareaComponent: ComponentStory<typeof Textarea> = () => {
  const [value, setValue] = React.useState('')
  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target
      const trimWhitespaceValue = value.replace(/\s/g, '')
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
