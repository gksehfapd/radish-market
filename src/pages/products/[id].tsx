import type { NextPage } from 'next'
import Button from '@/components/button'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { Product, User } from '@prisma/client'
import useMutation from '@/libs/client/useMutation'
import { cls } from '@/libs/client/utils'
import useUser from '@/libs/client/useUser'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProductWithUser extends Product {
	user: User
}

interface ItemDetailResponse {
	ok: boolean
	product: ProductWithUser
	relatedProducts: Product[]
	isLiked: boolean
}

const ItemDetail: NextPage = () => {
	const router = useRouter()
	const { user } = useUser()

	const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
		router.query.id ? `/api/products/${router.query.id}` : null
	)

	const [toggleFav, { loading }] = useMutation(`/api/products/${router.query.id}/fav`)

	const onFavClick = () => {
		if (!data) return
		boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false)
		// mutate('api/users/me', (prev: any) => ({ ok: !prev.ok }), false)

		if (!loading) {
			toggleFav({})
		}
	}

	const [toggleReserve, { loading: reserveLoading }] = useMutation(
		`/api/products/${router.query.id}/reserve`
	)

	const [isReserved, setIsReserved] = useState(false)

	const onReserveClick = () => {
		if (!data) return

		if (!reserveLoading) {
			toggleReserve({})
			setIsReserved((prev) => !prev)
		}
	}

	useEffect(() => {
		if (data?.product.reserved) {
			setIsReserved(true)
		} else if (!data?.product.reserved) {
			setIsReserved(false)
		}
	}, [data])

	return (
		<Layout canGoBack>
			<div className="px-4  py-4">
				<div className="mb-8">
					<div className="relative h-96">
						<Image
							alt=""
							src={`https://imagedelivery.net/VtzuniauOuty0o-pYoxlBw/${data?.product.image}/public`}
							className="bg-slate-300 object-cover"
							fill
						/>
						{isReserved ? (
							<div className="absolute w-full h-full rotate-12 flex items-center justify-center">
								<div className="bg-slate-300 w-full rotate-3 font-bold flex justify-center border-t-4 border-b-4 border-black">
									RESERVED RESERVED RESERVED RESERVED
								</div>
							</div>
						) : null}
					</div>
					<div className="flex justify-between items-center border-t border-b py-3 ">
						<div className="flex cursor-pointer items-center space-x-3">
							{data?.product.user.avatar ? (
								<Image
									alt=""
									width={48}
									height={48}
									className="w-12 h-12 rounded-full"
									src={`https://imagedelivery.net/VtzuniauOuty0o-pYoxlBw/${data?.product.user.avatar}/avatar`}
								/>
							) : (
								<div className="w-12 h-12 rounded-full bg-slate-300" />
							)}
							<div>
								<p className="text-sm font-medium text-gray-700">
									{data?.product?.user?.name}
								</p>
								<Link
									href={`/users/profiles/${data?.product?.user?.id}`}
									className="text-xs font-medium text-gray-500"
								>
									View profile &rarr;
								</Link>
							</div>
						</div>
						<div className="h-8">
							{data?.product.userId === user?.id ? (
								<button
									onClick={onReserveClick}
									className="mr-3 px-2 h-full w-full rounded-xl border-gray-300 border-2 text-xs hover:bg-gray-300 active:bg-gray-400"
								>
									{isReserved ? '예약 취소' : '예약 하기'}
								</button>
							) : (
								<div></div>
							)}
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-3xl font-bold text-gray-900">
							{data ? data.product?.name : 'Loading...'}
						</h1>
						<span className="text-2xl block mt-3 text-gray-900">
							${data ? data.product?.price : 'Loading...'}
						</span>
						<p className=" my-6 text-gray-700">
							{data ? data.product?.description : 'Loading...'}
						</p>
						<div className="flex items-center justify-between space-x-2">
							<Button large text="Talk to seller" />
							<button
								onClick={onFavClick}
								className={cls(
									'p-3 rounded-md flex items-center justify-center',
									data?.isLiked
										? ' text-red-500 hover:bg-red-100 hover:text-red-500'
										: ' text-gray-400 hover:bg-gray-100 hover:text-gray-500'
								)}
							>
								{data?.isLiked ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										className="h-5 w-5 "
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
					<div className=" mt-6 grid grid-cols-2 gap-4">
						{data?.relatedProducts
							? data.relatedProducts.map((product) => (
									<Link key={product.id} href={`/products/${product.id}`}>
										<div>
											<Image
												alt=""
												src={`https://imagedelivery.net/VtzuniauOuty0o-pYoxlBw/${product.image}/public`}
												className="bg-slate-300 object-cover"
												width={180}
												height={180}
											/>
											<h3 className="text-gray-700 -mb-1">{product.name}</h3>
											<span className="text-sm font-medium text-gray-900">
												${product.price}
											</span>
										</div>
									</Link>
							  ))
							: '연관상품 없음'}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ItemDetail
