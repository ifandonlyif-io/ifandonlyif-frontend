import { isAddress } from 'ethers/lib/utils.js'

export function stringSlice(
  string_: string,
  start: number,
  end: number
): string {
  return `${string_.slice(0, start)} ... ${string_.slice(-Math.abs(end))}`
}

export function shortenAddress(address: string): string {
  if (isAddress(address)) {
    return stringSlice(address, 6, 4)
  }
  return address
}
