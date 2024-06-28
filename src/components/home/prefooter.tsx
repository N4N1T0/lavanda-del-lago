// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import { PrefooterImage } from '@/assets'

/**
 * Renders the Prefooter component.
 *
 * @return {JSX.Element} The rendered prefooter section.
 */
const Prefooter = (): JSX.Element => {
	return (
		<section id='prefooter' className='w-full'>
			<Link href='/'>
				<Image
					alt='prefooter'
					src={PrefooterImage}
					title='prefooter'
					className='w-full object-fill'
				/>
			</Link>
		</section>
	)
}

export default Prefooter
