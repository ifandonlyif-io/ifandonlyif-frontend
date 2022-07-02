import { SelectMenuOption } from 'components/Forms'
import { DefaultTimezone } from 'data'
import React from 'react'

export type SortByTimezoneContextValue = {
  zone: SelectMenuOption
  onTimezoneChange: (option: SelectMenuOption) => void
}
export const SortByTimezoneContext =
  React.createContext<SortByTimezoneContextValue>({
    zone: DefaultTimezone,
    onTimezoneChange: () => void 0,
  })
