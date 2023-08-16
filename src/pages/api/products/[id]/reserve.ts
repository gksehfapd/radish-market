import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id },
		session: { user }
	} = req

	const product = await client.product.findUnique({
		where: {
			id: +id!.toString()
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true
				}
			}
		}
	})

	if (product?.user.id !== user?.id) {
		return res.json({ ok: false })
	} else if (product?.user.id === user?.id) {
		if (product?.reserved === true) {
			await client.product.update({
				where: {
					id: +id!.toString()
				},
				data: {
					reserved: false
				}
			})
		} else if (product?.reserved === false) {
			await client.product.update({
				where: {
					id: +id!.toString()
				},
				data: {
					reserved: true
				}
			})
		}
		res.json({ ok: true })
	}
}

export default withApiSession(
	withHandler({
		methods: ['POST'],
		handler
	})
)
