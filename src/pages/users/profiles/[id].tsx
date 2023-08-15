import Layout from '@/components/layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from 'next/image'
import Item from '@/components/item'
import { User } from '@prisma/client'
import { ProductWithCount } from '@/pages'

interface ProfileWithProducts extends User {
	products: ProductWithCount[]
}

interface UsersWithProductsResponse {
	ok: boolean
	profile: ProfileWithProducts
}

const UserProfile: NextPage = () => {
	const router = useRouter()

	const { data, mutate: boundMutate } = useSWR<UsersWithProductsResponse>(
		router.query.id ? `/api/users/someone/${router.query.id}` : null
	)

	return (
		<Layout hasTabBar title="유저정보">
			<div className="px-5">
				<div className="flex items-center justify-center mt-4 space-x-3">
					{data?.profile.avatar ? (
						<Image
							alt=""
							src={`https://imagedelivery.net/VtzuniauOuty0o-pYoxlBw/${data?.profile.avatar}/avatar`}
							className="w-16 h-16 bg-slate-500 rounded-full"
							height={64}
							width={64}
						/>
					) : (
						<div className="w-16 h-16 bg-slate-500 rounded-full" />
					)}
					<div className="flex flex-col">
						<span className="font-medium text-gray-900">{data?.profile.name}</span>
					</div>
				</div>
				<hr className="mt-5" />
				<div className="flex p-5 items-center justify-center">판매 목록</div>
				<hr className="" />
				<div className="flex flex-col space-y-5 divide-y">
					{' '}
					{data?.profile.products?.map((product: ProductWithCount) => (
						<div>
							<Item
								id={product.id}
								key={product.id}
								title={product.name}
								price={product.price}
								productIMG={product.image}
								comments={0}
								hearts={product._count.favs}
							/>
						</div>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default UserProfile
