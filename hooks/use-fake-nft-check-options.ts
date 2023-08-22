import React from 'react'

import type { SelectMenuOption } from '@/components/Forms'
import { useScopedI18n } from '@/locales'

interface FakeNFTCheckOptions {
  label: 'contract' | 'site'
  value: 'contract' | 'site'
}

const fakeNFTCheckOptions: FakeNFTCheckOptions[] = [
  { label: 'contract', value: 'contract' },
  { label: 'site', value: 'site' },
]

export function useFakeNFTCheckOptions() {
  const t = useScopedI18n('home.sectionNFTCheck.fakeNFTCheckPanel.checkOptions')

  const checkOptions = React.useMemo<SelectMenuOption[]>(() => {
    return fakeNFTCheckOptions.map(({ label, value }) => ({
      label: t(label),
      value,
    }))
  }, [t])

  const [selectedCheckValue, setSelectedCheckValue] =
    React.useState<FakeNFTCheckOptions['value']>('site')

  const selectedCheckOption = React.useMemo<
    SelectMenuOption | undefined
  >(() => {
    return checkOptions.find((option) => option.value === selectedCheckValue)
  }, [checkOptions, selectedCheckValue])

  const handleCheckOptionChange = React.useCallback(
    (option: SelectMenuOption) => {
      setSelectedCheckValue(option.value as FakeNFTCheckOptions['value'])
    },
    [],
  )

  return [checkOptions, selectedCheckOption, handleCheckOptionChange] as const
}
