import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phone, email } = req.body
	// if (email) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			email
	// 		}
	// 	})
	// 	if (user) {
	// 		console.log(user)
	// 	}
	// 	if (!user) {
	// 		console.log('did not find. will create')
	// 		user = await client.user.create({
	// 			data: {
	// 				name: 'Anonymous',
	// 				email
	// 			}
	// 		})
	// 	}
	// }

	// if (phone) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			phone: +phone
	// 		}
	// 	})
	// 	if (user) {
	// 		console.log(user)
	// 	}
	// 	if (!user) {
	// 		console.log('did not find. will create')
	// 		user = await client.user.create({
	// 			data: {
	// 				name: 'Anonymous',
	// 				phone: +phone
	// 			}
	// 		})
	// 	}
	// }

	const payload = phone ? { phone: +phone } : { email }

	const user = await client.user.upsert({
		where: {
			...payload
		},
		create: {
			name: 'Anonymous',
			...payload
		},
		update: {}
	})

	console.log(user)

	return res.status(200).end()
}

export default withHandler('POST', handler)
