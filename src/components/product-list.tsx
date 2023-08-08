import { ProductWithCount } from '@/pages'
import useSWR from 'swr'
import Item from './item'

interface Record {
	id: number
	product: ProductWithCount
}

interface ProductListResponse {
	[key: string]: Record[]
}

interface ProductListProps {
	kind: 'favs' | 'sales' | 'purchases'
}

export default function ProductList({ kind }: ProductListProps) {
	const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`)
	console.log(data)

	return data ? (
		<>
			{data[kind].map((record) => (
				<Item
					id={record.product.id}
					key={record.id}
					title={record.product.name}
					price={record.product.price}
					comments={1}
					hearts={record.product._count.favs}
				/>
			))}
		</>
	) : null
}
