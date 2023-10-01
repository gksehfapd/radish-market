import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id }
	} = req

	const post = await client.post.findUnique({
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
			},
			answers: {
				select: {
					answer: true,
					id: true,
					user: {
						select: {
							id: true,
							name: true,
							avatar: true
						}
					}
				}
			},
			_count: {
				select: {
					answers: true,
					Wondering: true
				}
			}
		}
	})
	return res.json({
		ok: true,
		post
	})
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
