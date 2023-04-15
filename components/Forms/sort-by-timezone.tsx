import { useTranslation } from 'next-i18next'
import React from 'react'

import { type SelectMenuOption, SelectMenus } from '@/components/Forms'
import { TimezoneOptions } from '@/data'
import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

export type SortByTimezoneProperties = BaseComponent & {
  defaultValue?: SelectMenuOption
  onOptionChange: (option: SelectMenuOption) => void
}

const timezoneOptions: SelectMenuOption[] = TimezoneOptions

export function SortByTimezone(properties: SortByTimezoneProperties) {
  const { className, defaultValue, onOptionChange } = properties
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
    if (!defaultValue) return
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
      <div className="text-iff-text mr-4 text-base font-bold">{t('label')}</div>
      <SelectMenus
        className="!text-iff-text min-w-[240px]"
        placeholder={t('placeholder')}
        options={timezoneOptionsWithTranslate}
        defaultValue={defaultValueWithTranslate}
        onOptionChange={onOptionChange}
      />
    </label>
  )
}
