import { SelectMenuOption, SelectMenus } from 'components/Forms'
import { TimezoneOptions } from 'data'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

export type SortByTimezoneProps = BaseComponent & {
  defaultValue?: SelectMenuOption
  onOptionChange: (option: SelectMenuOption) => void
}

const timezoneOptions: SelectMenuOption[] = TimezoneOptions

export function SortByTimezone(props: SortByTimezoneProps) {
  const { className, defaultValue, onOptionChange } = props
  const { t } = useTranslation(['common', 'overview'], {
    keyPrefix: 'forms.sortByTimezone',
  })
  const timezoneOptionsWithTranslate = React.useMemo(
    () =>
      timezoneOptions.map((option) => ({
        label: t(`timezoneOptions.${option.value}`),
        value: option.value,
      })),
    [t]
  )
  const defaultValueWithTranslate = React.useMemo(() => {
    if (!defaultValue) return undefined
    return {
      label: t(`timezoneOptions.${defaultValue.value}`),
      value: defaultValue.value,
    }
  }, [defaultValue, t])

  return (
    <label
      className={classNames(
        'flex flex-row flex-nowrap items-center',
        className
      )}
    >
      <div className="mr-4 text-base font-bold text-iff-text">{t('label')}</div>
      <SelectMenus
        className="min-w-[240px] !text-iff-text"
        placeholder={t('placeholder')}
        options={timezoneOptionsWithTranslate}
        defaultValue={defaultValueWithTranslate}
        onOptionChange={onOptionChange}
      />
    </label>
  )
}
