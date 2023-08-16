import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	if (req.method === 'GET') {
		const profile = await client.user.findUnique({
			where: { id: Number(req.query.id) },
			include: {
				products: {
					select: {
						id: true,
						name: true,
						price: true,
						image: true,
						_count: true,
						reserved: true
					}
				}
			}
		})
		res.json({ ok: true, profile })
	}
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))