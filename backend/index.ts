import { $fetch } from 'ohmyfetch'
import { GetDemoNFTListRes } from 'types/backend'

export async function getDemoNftList() {
  return await $fetch<GetDemoNFTListRes>(
    'http://localhost:3001/api/demo/nftlist'
  )
}
