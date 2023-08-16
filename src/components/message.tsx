import Image from 'next/image'
import { cls } from '@/libs/client/utils'

interface MessageProps {
	message: string
	reversed?: boolean
	avatarUrl?: string
	name?: string
}

export default function Message({ message, avatarUrl, reversed, name }: MessageProps) {
	return (
		<div
			className={cls(
				'flex  items-start  space-x-2',
				reversed ? 'flex-row-reverse space-x-reverse' : ''
			)}
		>
			{avatarUrl ? (
				<Image
					alt=""
					width={32}
					height={32}
					className="w-8 h-8 rounded-full bg-slate-400"
					src={`https://imagedelivery.net/VtzuniauOuty0o-pYoxlBw/${avatarUrl}/avatar`}
				/>
			) : (
				<div className="w-8 h-8 rounded-full bg-slate-400" />
			)}
			{reversed ? (
				<div className="w-1/2 flex flex-col items-end ">
					<span className="text-xs">{name ? name : 'No Name'}</span>
					<div className="text-sm w-fit text-gray-700 p-2 border border-gray-300 rounded-md">
						<p>{message}</p>
					</div>
				</div>
			) : (
				<div className="-mt-2 w-1/2">
					<span className="text-xs">{name ? name : 'No Name'}</span>
					<div className="text-sm w-fit text-gray-700 p-2 border border-gray-300 rounded-md">
						<p>{message}</p>
					</div>
				</div>
			)}
		</div>
	)
}
