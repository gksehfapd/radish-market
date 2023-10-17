import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	if (req.method === 'GET') {
		const products = await client.product.findMany({
			include: {
				_count: {
					select: {
						Fav: true
					}
				}
			}
		})

		res.json({ ok: true, products })
	} else if (req.method === 'POST') {
		const {
			body: { name, price, description, photoId },
			session: { user }
		} = req
		const product = await client.product.create({
			data: {
				name,
				price: +price,
				description,
				image: photoId,
				user: { connect: { id: user?.id } }
			}
		})
		return res.json({
			ok: true,
			product
		})
	}
}

export default withApiSession(withHandler({ methods: ['GET', 'POST'], handler }))
