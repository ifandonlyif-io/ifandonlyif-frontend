import type { NextApiRequest, NextApiResponse } from 'next'
import type { FeedbackItem } from 'types'

const demoFeedbackList: FeedbackItem[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    username: 'Kathryn Murphy',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    username: 'Guy Hawkins',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
    username: 'Bessie Cooper',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    username: 'Alexander Hipp',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d',
    username: 'Alex Suprun',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa',
    username: 'Julian Wan',
    content:
      'The best way to protect your NFTs, using this solutions and you are free to connection the web3 world.',
  },
]

function handler(_: NextApiRequest, res: NextApiResponse<FeedbackItem[]>) {
  res.status(200).json(demoFeedbackList)
}

export default handler
