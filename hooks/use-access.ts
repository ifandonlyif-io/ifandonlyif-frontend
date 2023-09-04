import React from 'react'

import { useIffAccount } from './use-account'
import { useRefreshToken } from './use-refresh-token'

export function useAccess() {
  const { isExpired } = useRefreshToken()
  const { isAccountMissMatch } = useIffAccount()

  const noAccess = React.useMemo<boolean>(
    () => isExpired || isAccountMissMatch,
    [isExpired, isAccountMissMatch],
  )

  return { noAccess }
}
