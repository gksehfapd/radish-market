import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const profile = await client.user.findUnique({
		where: { id: req.session.user?.id }
	})
	return res.json({
		ok: true,
		profile
	})
}

export default withApiSession(withHandler({ method: 'GET', handler }))
