import type { NextApiRequest, NextApiResponse } from 'next'

import type { NFTItem } from '@/types'

const demoNFTList: NFTItem[] = [
  {
    address: '',
    name: 'NFT Project Name 12',
    unixEpoch: 1_652_652_000,
    imageUri: '/demo/img/12.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 13',
    unixEpoch: 1_655_330_400,
    imageUri: '/demo/img/13.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 14',
    unixEpoch: 1_657_576_800,
    imageUri: '/demo/img/14.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 15',
    unixEpoch: 1_657_922_400,
    imageUri: '/demo/img/15.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
]

function handler(_: NextApiRequest, response: NextApiResponse<NFTItem[]>) {
  response.status(200).json(demoNFTList)
}

export default handler
