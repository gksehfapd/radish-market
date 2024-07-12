import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id },
		session: { user }
	} = req
	if (req.method === 'GET') {
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
								avatar: true,
								id: true
							}
						}
					}
				}
			}
		})

		const isOwner = stream?.userId == user?.id

		if (stream && !isOwner) {
			stream.cloudflareUrl = 'xxxxx'
			stream.cloudflareKey = 'xxxxx'
		}
		res.json({
			ok: true,
			stream
		})
	}
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
