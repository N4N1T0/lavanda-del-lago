import Related from '@/components/blog/related'
import Prefooter from '@/components/home/prefooter'
import Newsletter from '@/components/shared/newsletter'
import { ServerFetchError } from '@/components/shared/server-fetch-error'
import type { Posts } from '@/types'
import Image from 'next/image'
import React from 'react'

const BlogArticlePage = async ({ params }: { params: { id: string } }) => {
	try {
		const response = await fetch(
			`https://jsonplaceholder.org/posts/${params.id}`,
		)
		const post: Posts = await response.json()

		return (
			<>
				<section
					id={post.title}
					className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 items-center h-auto'
				>
					<div className='w-full md:w-3/4 text-center space-y-5'>
						<h1 className='text-5xl'>{post.title}</h1>
						<p className='text-gray-600'>
							{post.content.split(' ').slice(0, 20).join(' ')}
						</p>
					</div>
					<Image
						src={post.image}
						alt={post.title}
						title={post.title}
						width={1800}
						height={1800}
					/>
					<div className='w-full md:w-3/4 text-left space-y-7 font-light'>
						{Array.from({ length: 3 })
							.fill(post.content)
							.map((item, index) => (
								<p key={`${item}-${index + 1}`}>{item as string}</p>
							))}
						<Image
							src={post.image}
							alt={post.title}
							title={post.title}
							width={1200}
							height={1200}
						/>
						{Array.from({ length: 2 })
							.fill(post.content)
							.map((item, index) => (
								<p key={`${item}-${index + 1}`}>{item as string}</p>
							))}
					</div>
					<Related category={post.category} />
				</section>
				<Newsletter />
				<Prefooter />
			</>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default BlogArticlePage
