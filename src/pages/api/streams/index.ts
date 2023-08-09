import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		session: { user },
		body: { name, price, description },
		query: { page }
	} = req
	if (req.method === 'POST') {
		const stream = await client.stream.create({
			data: {
				name,
				price,
				description,
				user: {
					connect: {
						id: user?.id
					}
				}
			}
		})
		return res.json({ ok: true, stream })
	} else if (req.method === 'GET') {
		const pageNum = Number(page) - 1
		const countStreams = await client.stream.count()
		const streams = await client.stream.findMany({
			take: 10,
			skip: 10 * pageNum
		})
		return res.json({ ok: true, streams, countStreams })
	}

	res.json({ ok: true })
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }))
