import type { NextApiRequest, NextApiResponse } from 'next'

import type { GetDemoNFTListResponse } from '@/types'

const demoNFTList: GetDemoNFTListResponse = {
  myWhitelist: [
    {
      address: '',
      name: 'NFT Project Name 01',
      unixEpoch: 1_652_652_000,
      imageUri: '/demo/img/1.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 02',
      unixEpoch: 1_655_330_400,
      imageUri: '/demo/img/2.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 03',
      unixEpoch: 1_657_922_400,
      imageUri: '/demo/img/3.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 04',
      unixEpoch: 1_660_600_800,
      imageUri: '/demo/img/4.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 05',
      unixEpoch: 1_644_962_400,
      imageUri: '/demo/img/5.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
  ],
  preSaleWhitelist: [
    {
      address: '',
      name: 'NFT Project Name 06',
      unixEpoch: 1_652_652_000,
      imageUri: '/demo/img/6.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 07',
      unixEpoch: 1_655_330_400,
      imageUri: '/demo/img/7.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 08',
      unixEpoch: 1_657_576_800,
      imageUri: '/demo/img/8.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 09',
      unixEpoch: 1_657_922_400,
      imageUri: '/demo/img/9.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 10',
      unixEpoch: 1_660_600_800,
      imageUri: '/demo/img/10.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
    {
      address: '',
      name: 'NFT Project Name 11',
      unixEpoch: 1_644_962_400,
      imageUri: '/demo/img/11.png',
      symbol: 'NPN',
      tokenId: 1,
      tokenType: 'ERC721',
    },
  ],
}

function handler(
  _: NextApiRequest,
  response: NextApiResponse<GetDemoNFTListResponse>,
) {
  response.status(200).json(demoNFTList)
}

export default handler
