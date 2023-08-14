import client from '@/libs/server/client'
import withHandler, { ResponseType } from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	if (req.method === 'GET') {
		const profile = await client.user.findUnique({
			where: { id: req.session.user?.id },
			include: {
				products: true
			}
		})
		res.json({ ok: true, profile })
	}
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
