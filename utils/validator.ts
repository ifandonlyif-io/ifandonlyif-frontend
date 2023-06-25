import { type ValidateResult } from 'react-hook-form'
import { getAddress, isAddress } from 'viem'

import { publicClient } from './chain'

export function validateStringIsUrl(value: string): boolean {
  if (typeof value !== 'string') return false
  try {
    const url = new URL('/', value)
    if (url.origin) return true
    return false
  } catch {
    return false
  }
}

export function validateUrlIsHttp(url: URL): boolean {
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function validateUrlNotContainUserInfo(url: URL): boolean {
  return !url.username && !url.password
}

export function validateStringIsAddress(value: string): boolean {
  return isAddress(value)
}

export async function validateAddressIsContract(
  address: `0x${string}`
): Promise<boolean> {
  if (!address) return false
  const code = await publicClient.getBytecode({ address })
  if (!code) return false
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

export async function validateMintIffNftFormInputAddress(
  value: `0x${string}`,
  account: string | null | undefined
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
  value: `0x${string}`
): Promise<ValidateResult> {
  const address = validateStringIsAddress(value)
  if (!address)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidAddress'
  const contract = await validateAddressIsContract(value)
  if (contract)
    return 'overview.panelMintIt.mintItMyNFT.mintModal.input.errorMessage.invalidWallet'
  return true
}
