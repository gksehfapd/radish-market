import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

interface ResponseType {
	ok: boolean
	[key: string]: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body
	const user = phone ? { phone: +phone } : { email }
	const payload = Math.floor(100000 + Math.random() * 900000) + ''
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: { ...user },
					create: { name: 'Anonymous', ...user }
				}
			}
		}
	})

	res.status(200).end()
}

export default withHandler('POST', handler)
