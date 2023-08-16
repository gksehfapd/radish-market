import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id },
		session: { user }
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
					createdAt: true,
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
					interests: true
				}
			}
		}
	})

	const isInteresting = Boolean(
		await client.interested.findFirst({
			where: {
				postId: +id!.toString(),
				userId: user?.id
			},
			select: {
				id: true
			}
		})
	)
	res.json({ ok: true, post, isInteresting })
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
