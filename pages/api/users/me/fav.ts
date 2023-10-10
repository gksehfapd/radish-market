import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		session: { user }
	} = req

	const favs = await client.fav.findMany({
		where: {
			userId: user!.id
		},
		include: {
			product: {
				include: {
					_count: {
						select: {
							Fav: true
						}
					}
				}
			}
		}
	})

	return res.json({
		ok: true,
		favs
	})
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
