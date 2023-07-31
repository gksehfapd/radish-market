export default function Home() {
	return (
		<div className="bg-slate-400 py-10 px-20 grid gap-10 min-h-screen">
			<div className="bg-white p-6 rounded-3xl shadow-xl">
				<span className="font-semibold text-3xl">Select Item</span>
				<div className="flex justify-between my-3">
					<span className="text-gray-500">Grey Chair</span>
					<span className="font-semibold">$170</span>
				</div>
				<div className="flex justify-between mb-3">
					<span className="text-gray-500 ">Tooly Table</span>
					<span className="font-semibold">$800</span>
				</div>
				<div className="mt-2 pt-2 border-t-2 border-dashed flex justify-between">
					<span>Total</span>
					<span className="font-semibold">$970</span>
				</div>
				<button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto block hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:text-red-500">
					Checkout
				</button>
			</div>
			<div className="bg-white overflow-hidden rounded-3xl shadow-xl">
				<div>
					<div className="bg-blue-500 p-6 pb-14">
						<span className="text-white text-2xl">Profile</span>
					</div>
					<div className="rounded-3xl p-6 bg-white relative -top-5">
						<div className="flex relative -top-16 items-end justify-between">
							<div className="flex flex-col items-center">
								<span className="text-sm text-gray-500">Orders</span>
								<span className="font-medium">$340</span>
							</div>
							<div className="h-24 w-24 bg-gray-300 rounded-full" />
							<div className="flex flex-col items-center">
								<span className="text-sm text-gray-500">Spent</span>
								<span className="font-medium">$340</span>
							</div>
						</div>
						<div className="relative flex flex-col items-center -mt-10 -mb-5">
							<span className="text-lg font-medium">Tony Molloy</span>
							<span className="text-sm text-gray-500">NewYork, USA</span>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white p-10 rounded-3xl shadow-xl">
				<div className="flex justify-between items-center mb-5">
					<span>&larr;</span>
					<div className="space-x-3">
						<span>⭐️4.9</span>
						<span className="shadow-xl p-2 rounded-md">❤️</span>
					</div>
				</div>
				<div className="bg-zinc-400 h-72 mb-5"></div>
				<div className="flex flex-col">
					<span className="font-medium text-xl">Swoon Lounge</span>
					<span className="text-xs text-gray-500">Chair</span>
					<div className="mt-3 mb-5 flex justify-between items-center">
						<div className="space-x-2">
							<button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition"></button>
							<button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition"></button>
							<button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition"></button>
						</div>
						<div className="flex items-center space-x-5">
							<button className="p-2.5 bg-blue-200 flex justify-center items-center h-8 w-8 text-xl text-gray-500 rounded-lg">
								-
							</button>
							<span>1</span>
							<button className="p-2.5 bg-blue-200 flex justify-center items-center h-8 w-8 text-xl text-gray-500 rounded-lg">
								+
							</button>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-2xl">$450</span>
						<button className="bg-blue-500 py-2 px-8 text-sm text-center text-white rounded-lg">
							Add to cart
						</button>
					</div>
				</div>
			</div>
			<div className="bg-white p-10 rounded-3xl shadow-xl"></div>
		</div>
	)
}
