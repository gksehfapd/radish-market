import type { NextPage } from 'next'
import Link from 'next/link'
import FloatingButton from '@/components/floating-button'
import Layout from '@/components/layout'
import { Stream } from '@prisma/client'
import useSWR from 'swr'
import { useState } from 'react'

interface StreamsResponse {
	ok: boolean
	streams: Stream[]
	countStreams: number
}

const Streams: NextPage = () => {
	const [pageNum, setPageNum] = useState(1)
	const [pageListNum, setPageListNum] = useState(0)
	const shownPages = 10

	const { data } = useSWR<StreamsResponse>(`/api/streams?page=${pageNum}`)

	const totalPages = Math.ceil(data?.countStreams! / shownPages)
	const pageArr = Array.from({ length: totalPages }, (v, i) => i + 1)

	const maxPageList = Math.floor(totalPages / 10) * 10

	let currentPageList = pageArr.slice(pageListNum, pageListNum + shownPages)

	const onPageBtnClick = (clickedNum: number) => {
		setPageNum(clickedNum)
		window.scrollTo(0, 0)
	}

	const prevPageList = () => {
		if (pageListNum <= 0) return
		setPageListNum((prev) => prev - shownPages)
	}

	const nextPageList = () => {
		if (pageListNum >= maxPageList) return
		setPageListNum((prev) => prev + shownPages)
	}

	return (
		<Layout hasTabBar title="라이브">
			<div className=" divide-y-[1px] space-y-4">
				{data?.streams.map((stream) => (
					<Link
						key={stream.id}
						href={`/streams/${stream.id}`}
						className="pt-4 block px-4"
					>
						<div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
						<h1 className="text-2xl mt-2 font-bold text-gray-900">{stream.name}</h1>
					</Link>
				))}
				<FloatingButton href="/live/create">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						></path>
					</svg>
				</FloatingButton>

				<div className="pt-4 px-8 flex justify-between ">
					<button onClick={prevPageList}>&larr;</button>
					{currentPageList.map((pageSelect) => (
						<button key={pageSelect} onClick={() => onPageBtnClick(pageSelect)}>
							{pageSelect}
						</button>
					))}
					<button onClick={nextPageList}>&rarr;</button>
				</div>
			</div>
		</Layout>
	)
}

export default Streams
