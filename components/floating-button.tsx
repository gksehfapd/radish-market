import { cls } from '@/libs/client/utils'
import Link from 'next/link'
import React from 'react'

interface FloatingButton {
	children: React.ReactNode
	href: string
	hide?: boolean
}

export default function FloatingButton({ children, href, hide }: FloatingButton) {
	return (
		<Link
			href={href}
			className={cls(
				'fixed hover:bg-orange-500 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full w-14 items-center justify-center text-white',
				hide ? 'hidden' : 'flex'
			)}
		>
			{children}
		</Link>
	)
}
