import Head from 'next/head'
import db from "../../database.json"
import { useRouter } from 'next/router'

export default () => {
	const router = useRouter()
	const product = db.products.find(product => product.slug === router.query.slug)

	if (!product)
		return (
			<div>
				<h2 className="text-3xl font-bold">Product not found!</h2>
			</div>
		)

	return (
		<div>
			<Head>
				<title>{ product.name } | Estore</title>
			</Head>

			<main>
				<h1 className="text-3xl font-bold">
					{ product.name }
				</h1>
				<div>
					<h3 className="text-2xl font-bold underline">Product Description</h3>
					<div>

					</div>
					<p>
						{ product.description }
					</p>
				</div>
			</main>
		</div>
	)
}
