import { withIronSessionApiRoute } from 'iron-session/next'
import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { token } = req.body

	const exists = await client.token.findUnique({
		where: {
			payload: token
		}
	})

	if (!exists) res.status(404).end()

	req.session.user = {
		id: exists?.userId
	}

	await req.session.save()
	//logout 하려면 save() 를 destroy()로 변경

	return res.status(200).end()
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
	cookieName: 'carrotsession',
	password: `${process.env.COOKIE_PASSWORD}`
})
