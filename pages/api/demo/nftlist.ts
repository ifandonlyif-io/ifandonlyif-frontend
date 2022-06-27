import type { NextApiRequest, NextApiResponse } from 'next'
import type { NFTItem } from 'types'

type NFTList = {
  myWhitelist: NFTItem[]
  preSaleWhitelist: NFTItem[]
  myNFT: NFTItem[]
}

const demoNFTList: NFTList = {
  myWhitelist: [
    {
      name: 'NFT Project Name 01',
      unixEpoch: 1652652000,
      imageUri: '/demo/img/1.png',
    },
    {
      name: 'NFT Project Name 02',
      unixEpoch: 1655330400,
      imageUri: '/demo/img/2.png',
    },
    {
      name: 'NFT Project Name 03',
      unixEpoch: 1657922400,
      imageUri: '/demo/img/3.png',
    },
    {
      name: 'NFT Project Name 04',
      unixEpoch: 1660600800,
      imageUri: '/demo/img/4.png',
    },
    {
      name: 'NFT Project Name 05',
      unixEpoch: 1644962400,
      imageUri: '/demo/img/5.png',
    },
  ],
  preSaleWhitelist: [
    {
      name: 'NFT Project Name 06',
      unixEpoch: 1652652000,
      imageUri: '/demo/img/6.png',
    },
    {
      name: 'NFT Project Name 07',
      unixEpoch: 1655330400,
      imageUri: '/demo/img/7.png',
    },
    {
      name: 'NFT Project Name 08',
      unixEpoch: 1657576800,
      imageUri: '/demo/img/8.png',
    },
    {
      name: 'NFT Project Name 09',
      unixEpoch: 1657922400,
      imageUri: '/demo/img/9.png',
    },
    {
      name: 'NFT Project Name 10',
      unixEpoch: 1660600800,
      imageUri: '/demo/img/10.png',
    },
    {
      name: 'NFT Project Name 11',
      unixEpoch: 1644962400,
      imageUri: '/demo/img/11.png',
    },
  ],
  myNFT: [
    {
      name: 'NFT Project Name 12',
      unixEpoch: 1652652000,
      imageUri: '/demo/img/12.png',
    },
    {
      name: 'NFT Project Name 13',
      unixEpoch: 1655330400,
      imageUri: '/demo/img/13.png',
    },
    {
      name: 'NFT Project Name 14',
      unixEpoch: 1657576800,
      imageUri: '/demo/img/14.png',
    },
    {
      name: 'NFT Project Name 15',
      unixEpoch: 1657922400,
      imageUri: '/demo/img/15.png',
    },
  ],
}

function handler(_: NextApiRequest, res: NextApiResponse<NFTList>) {
  res.status(200).json(demoNFTList)
}

export default handler
