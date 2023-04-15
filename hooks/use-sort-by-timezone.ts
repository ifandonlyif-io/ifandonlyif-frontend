import React from 'react'

import { SortByTimezoneContext } from '@/context'

export function useSortByTimezone() {
  const { zone } = React.useContext(SortByTimezoneContext)
  return zone
}
