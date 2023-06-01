import React from 'react'

import { useIffAccount } from './use-account'
import { useRefreshToken } from './use-refresh-token'

export function useAccess() {
  const { expired } = useRefreshToken()
  const { account, missMatch } = useIffAccount()

  const noAccess = React.useMemo<boolean>(
    () => expired || (!!account && missMatch),
    [account, expired, missMatch]
  )

  return { noAccess }
}
