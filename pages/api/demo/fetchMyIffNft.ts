import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTItem } from 'types'

const demoNFTList: NFTItem[] = [
  {
    address: '',
    name: 'NFT Project Name 12',
    unixEpoch: 1652652000,
    imageUri: '/demo/img/12.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 13',
    unixEpoch: 1655330400,
    imageUri: '/demo/img/13.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 14',
    unixEpoch: 1657576800,
    imageUri: '/demo/img/14.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
  {
    address: '',
    name: 'NFT Project Name 15',
    unixEpoch: 1657922400,
    imageUri: '/demo/img/15.png',
    symbol: 'NPN',
    tokenId: 1,
    tokenType: 'ERC721',
  },
]

function handler(_: NextApiRequest, res: NextApiResponse<NFTItem[]>) {
  res.status(200).json(demoNFTList)
}

export default handler
