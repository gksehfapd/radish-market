import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const {
		session: { user }
	} = req

	const sales = await client.sale.findMany({
		where: {
			userId: user!.id
		},
		include: {
			product: true
		}
	})

	return res.json({
		ok: true,
		sales
	})
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
