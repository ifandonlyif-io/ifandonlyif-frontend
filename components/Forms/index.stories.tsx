import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Input, SelectMenuOption, SelectMenus, Textarea } from './index'
import { Radio, RadioGroup } from './radio'

const DivElement = () => <div />

export default {
  title: 'Components/Forms',
  component: DivElement,
} as ComponentMeta<typeof DivElement>

const defaultSelectOptions: SelectMenuOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Meta', value: 'meta' },
  { label: 'Microsoft', value: 'microsoft' },
]

export const SelectMenusComponent: ComponentStory<typeof SelectMenus> = (
  args
) => (
  <div className="w-80">
    <SelectMenus {...args} />
  </div>
)
SelectMenusComponent.args = {
  placeholder: 'Please select',
  options: defaultSelectOptions,
  onOptionChange: (option) => window.alert(option.value),
}

export const InputComponent: ComponentStory<typeof Input> = (args) => (
  <div className="w-80">
    <Input {...args} />
  </div>
)
InputComponent.args = {
  placeholder: '#',
}

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

export const RadioComponent: ComponentStory<typeof Radio> = (args) => (
  <Radio {...args}>Email</Radio>
)
RadioComponent.args = {
  id: 'radio-email',
  name: 'contact',
  value: 'email',
  checked: false,
}

export const RadioGroupComponent: ComponentStory<typeof RadioGroup> = (
  args
) => (
  <RadioGroup {...args}>
    <Radio value="email">Email</Radio>
    <Radio value="phone">Phone</Radio>
    <Radio value="fax">Fax</Radio>
  </RadioGroup>
)
RadioGroupComponent.args = {
  name: 'contact',
}
