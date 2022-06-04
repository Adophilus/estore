import Head from 'next/head'
import Link from 'next/Link'
import db from "../database.json"

export default () => {
	return (
		<div>
			<Head>
				<title>Product Page</title>
			</Head>

			<main>
				<h2 className="text-2xl">
					Here is a list of all our products
				</h2>
				<div>
					<ul>
						{ Object.keys(db.products).map((key, index) => {
							return (
								<li key={ index }>
									<Link href={ '/product/' + db.products[index].slug }>
										<a>{ db.products[index].name }</a>
									</Link>
								</li>
							)
						}) }
					</ul>
				</div>
			</main>
		</div>
	)
}
