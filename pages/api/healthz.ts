import type { NextApiRequest, NextApiResponse } from 'next'

function handler(_: NextApiRequest, response: NextApiResponse<string>) {
  response.status(200).json('OK')
}

export default handler
