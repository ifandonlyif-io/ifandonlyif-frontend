import { SortByTimezoneContext } from 'context'
import React from 'react'

export function useSortByTimezone() {
  const { zone } = React.useContext(SortByTimezoneContext)
  return zone
}
