import { NFTArray } from 'constants/'

export function getIffNftTypeId(name: string): number | null {
  const _name = name.toLowerCase()
  const index = NFTArray.findIndex((value) => {
    const _value = value.toLowerCase()
    const match = _value === _name
    console.debug('getIffNftTypeId', _name, _value, match)
    return match
  })
  if (index === -1) return null
  return index
}
