import Breadcrumbs from '@/components/products/breadcrumbs'
import ProductsSidebar from '@/components/products/sidebar'

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Breadcrumbs />
			<section
				id='main-products'
				className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex gap-10'
			>
				<ProductsSidebar />
				{children}
			</section>
		</>
	)
}
