import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		session: { user },
		body: { name, price, description }
	} = req
	if (req.method === 'POST') {
		const stream = await client.stream.create({
			data: {
				name,
				price,
				description,
				user: {
					connect: {
						id: user!.id
					}
				}
			}
		})
		res.json({
			ok: true,
			stream
		})
	}

	if (req.method === 'GET') {
		const {
			query: { page }
		} = req

		const count = await client.stream.count({})
		const streams = await client.stream.findMany({
			take: 10,
			skip: 10 * (Number(page) - 1)
		})
		res.json({ ok: true, streams, count })
	}
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }))
