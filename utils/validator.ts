import { ValidateResult } from 'react-hook-form'

export function validateStringIsUrl(value: string): boolean {
  try {
    const url = new URL('/', value)
    if (url.origin) return true
    return false
  } catch (error) {
    return false
  }
}

export function validateCheckSiteUrlData(value: string): ValidateResult {
  const check = validateStringIsUrl(value)
  if (check) return true
  if (!check)
    return 'home.sectionNFTCheck.siteCheckPanel.textarea.errorMessage.correctUrl'
}
