import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import { withApiSession } from '@/libs/server/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { token } = req.body

	const foundToken = await client.token.findUnique({
		where: {
			payload: token
		}
	})

	if (!foundToken) return res.status(404).end()

	req.session.user = {
		id: foundToken.userId
	}

	await req.session.save()
	//logout 하려면 save() 를 destroy()로 변경
	await client.token.deleteMany({
		where: {
			userId: foundToken.userId
		}
	})

	return res.json({ ok: true })
}

export default withApiSession(withHandler('POST', handler))
