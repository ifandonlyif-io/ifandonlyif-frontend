import { isAddress } from 'ethers/lib/utils'
import { ValidateResult } from 'react-hook-form'

import { readonlyProvider } from './chain'

export function validateStringIsUrl(value: string): boolean {
  try {
    const url = new URL('/', value)
    if (url.origin) return true
    return false
  } catch (error) {
    return false
  }
}

export function validateStringIsAddress(value: string): boolean {
  return isAddress(value)
}

export async function validateAddressIsContract(
  address: string
): Promise<boolean> {
  const code = await readonlyProvider.getCode(address)
  if (code === '0x') return false
  return true
}

export function validateCheckSiteUrlData(value: string): ValidateResult {
  const check = validateStringIsUrl(value)
  if (check) return true
  if (!check)
    return 'home.sectionNFTCheck.siteCheckPanel.textarea.errorMessage.correctUrl'
}
