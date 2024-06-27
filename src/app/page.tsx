import Info from '@/components/home/info'
import Hero from '@/components/home/hero'
import Categories from '@/components/home/categories'
import FeaturedList from '@/components/home/featured-list'
import HomeProductsList from '@/components/home/home-products-list'
import Newsletter from '@/components/shared/newsletter'
import Prefooter from '@/components/home/prefooter'

/**
 * Renders the Home component which displays a hero section, categories section,
 * home products list, info section, featured lists for jewelry and electronics,
 * newsletter section, and prefooter section.
 *
 * @return {JSX.Element} The rendered Home component.
 */
export default function Home(): JSX.Element {
	return (
		<>
			<Hero />
			<Categories />
			<HomeProductsList />
			<Info />
			<FeaturedList itemCategory='jewelery' featuredTitle='productos Nuevos' />
			<FeaturedList
				itemCategory='electronics'
				featuredTitle='Lo mas vendido'
				direction='right'
			/>
			<Newsletter />
			<Prefooter />
		</>
	)
}
