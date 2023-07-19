import React from 'react'

import { type SelectMenuOption, SelectMenus } from '@/components/Forms'
import { TimezoneOptions } from '@/data'
import { useScopedI18n } from '@/locales'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

export type SortByTimezoneProperties = BaseComponent & {
  defaultValue?: SelectMenuOption
  onOptionChange: (option: SelectMenuOption) => void
}

const timezoneOptions: SelectMenuOption[] = TimezoneOptions

export function SortByTimezone(properties: SortByTimezoneProperties) {
  const { className, defaultValue, onOptionChange } = properties
  const t = useScopedI18n('component.sortByTimezone')
  const timezoneOptionsWithTranslate = React.useMemo(
    () =>
      timezoneOptions.map((option) => ({
        // @ts-expect-error Timezone options type
        label: t(`timezoneOptions.${option.value}`),
        value: option.value,
      })),
    [t],
  )
  const defaultValueWithTranslate = React.useMemo(() => {
    if (!defaultValue) return
    return {
      // @ts-expect-error Timezone options type
      label: t(`timezoneOptions.${defaultValue.value}`),
      value: defaultValue.value,
    }
  }, [defaultValue, t])

  return (
    <label className={cn('flex flex-row flex-nowrap items-center', className)}>
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
