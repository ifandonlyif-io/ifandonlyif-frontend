import React from 'react'

import type { SelectMenuOption } from '@/components/Forms'
import { DefaultTimezone } from '@/data'

export type SortByTimezoneContextValue = {
  zone: SelectMenuOption
  onTimezoneChange: (option: SelectMenuOption) => void
}
export const SortByTimezoneContext =
  React.createContext<SortByTimezoneContextValue>({
    zone: DefaultTimezone,
    onTimezoneChange: () => void 0,
  })
