import { getAddress, isAddress } from 'ethers/lib/utils'
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

export function validateToAddressMatch(
  address0: string,
  address1: string
): boolean {
  const _a0 = getAddress(address0)
  const _a1 = getAddress(address1)
  return _a0 !== _a1
}

export function validateCheckSiteUrlData(value: string): ValidateResult {
  const check = validateStringIsUrl(value)
  if (check) return true
  if (!check)
    return 'home.sectionNFTCheck.siteCheckPanel.textarea.errorMessage.correctUrl'
}

export async function validateMintIffNftFormInputAddress(
  value: string,
  account: string | null
): Promise<ValidateResult> {
  const isAddress = validateStringIsAddress(value)
  if (!isAddress || !account)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidAddress'

  const match = validateToAddressMatch(value, account)
  if (!match)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.notOwnAddress'

  const contract = await validateAddressIsContract(value)
  if (contract)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidWallet'
  return true
}

export async function validateMintIffNftFormUserInfo(
  value: string
): Promise<ValidateResult> {
  const address = validateStringIsAddress(value)
  if (!address)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidAddress'
  const contract = await validateAddressIsContract(value)
  if (contract)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidWallet'
  return true
}
