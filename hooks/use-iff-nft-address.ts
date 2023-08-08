import React from 'react'

import { getIffNftContractAddress } from '@/utils'

export function useIffNftAddress() {
  const address = React.useMemo<`0x${string}`>(
    () => getIffNftContractAddress(),
    [],
  )

  return address
}
