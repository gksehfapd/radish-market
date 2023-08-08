import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id }
	} = req

	const stream = await client.stream.findUnique({
		where: {
			id: +id!.toString()
		},
		include: {
			messages: {
				select: {
					id: true,
					message: true,
					user: {
						select: {
							name: true,
							id: true,
							avatar: true
						}
					}
				}
			}
		}
	})
	res.json({ ok: true, stream })
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
