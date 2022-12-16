import type { NextApiRequest, NextApiResponse } from 'next'

function handler(_: NextApiRequest, res: NextApiResponse<string>) {
  res.status(200).json('OK')
}

export default handler
