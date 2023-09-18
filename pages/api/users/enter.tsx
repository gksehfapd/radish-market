import twillo from 'twilio'
import client from '@/libs/server/client'
import withHandler from '@/libs/server/withHandler'
import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseType } from '@/libs/server/withHandler'
import smtpTransport from '@/libs/server/email'

const twilioClient = twillo(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body

	const user = phone ? { phone } : { email }
	const payload = Math.floor(10000 + Math.random() * 900000) + ''

	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: {
						...user
					},
					create: {
						name: 'Anonymous',
						...user
					}
				}
			}
		}
	})

	console.log(token)

	if (phone) {
		// await twilioClient.messages.create({
		// 	messagingServiceSid: process.env.TWILIO_MSID,
		// 	to: process.env.MY_PHONE!,
		// 	body: `Your token is ${payload}`
		// })
	}

	if (email) {
		// const mailOptions = {
		// 	from: process.env.MAIL_ID,
		// 	to: email,
		// 	subject: 'Nomad Carrot Authentication Email',
		// 	text: `Authentication Code : ${payload}`
		// }
		// const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
		// 	if (error) {
		// 		console.log(error)
		// 		return null
		// 	} else {
		// 		console.log(responses)
		// 		return null
		// 	}
		// })
		// smtpTransport.close()
		// console.log(result)
	}

	return res.json({
		ok: true
	})
}

export default withHandler('POST', handler)
