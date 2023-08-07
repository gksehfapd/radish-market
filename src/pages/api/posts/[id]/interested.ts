import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		query: { id },
		session: { user }
	} = req

	const alreadyExists = await client.interested.findFirst({
		where: {
			userId: user?.id,
			postId: +id!.toString()
		},
		select: {
			id: true
		}
	})

	if (alreadyExists) {
		await client.interested.delete({
			where: {
				id: alreadyExists.id
			}
		})
	} else {
		await client.interested.create({
			data: {
				user: {
					connect: {
						id: user?.id
					}
				},
				post: {
					connect: {
						id: +id!.toString()
					}
				}
			}
		})
	}

	res.json({ ok: true })
}

export default withApiSession(withHandler({ methods: ['POST'], handler }))
