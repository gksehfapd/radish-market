import Link from 'next/link'
import React from 'react'

interface FloatingButton {
	children: React.ReactNode
	href: string
}

export default function FloatingButton({ children, href }: FloatingButton) {
	return (
		<Link
			href={href}
			className="fixed hover:bg-orange-500 border-0 aspect-square border-transparent transition-colors cursor-pointer -top-3 right-4 shadow-xl bg-orange-400 rounded-full w-10 flex items-center justify-center text-white"
		>
			{children}
		</Link>
	)
}
