'use client'

import { UserInfoCard } from '@/components/profile/info-card'
import { CategoryItemsCard } from '@/components/profile/new-items'
import { PastPurchasesCard } from '@/components/profile/past-purchase'
import { useState } from 'react'
export default function UserProfile() {
	const [user, setUser] = useState({
		name: 'Alice Johnson',
		email: 'alice@example.com',
		phone: '+1 (555) 123-4567',
		address: '123 Main St, Anytown, USA',
		avatarUrl: '/placeholder.svg?height=100&width=100',
	})

	const categoryItems = {
		name: 'Electronics',
		items: [
			{ id: 1, name: 'Wireless Earbuds', price: 79.99 },
			{ id: 2, name: 'Smart Watch', price: 199.99 },
			{ id: 3, name: 'Portable Charger', price: 49.99 },
			{ id: 4, name: 'Bluetooth Speaker', price: 89.99 },
			{ id: 5, name: 'Fitness Tracker', price: 69.99 },
		],
	}

	const pastPurchases = [
		{
			id: 1,
			name: 'Laptop',
			price: 999.99,
			date: '2023-05-15',
			category: 'Electronics',
		},
		{
			id: 2,
			name: 'Smartphone',
			price: 699.99,
			date: '2023-04-02',
			category: 'Electronics',
		},
		{
			id: 3,
			name: 'Headphones',
			price: 149.99,
			date: '2023-03-20',
			category: 'Electronics',
		},
		{
			id: 4,
			name: 'Tablet',
			price: 349.99,
			date: '2023-02-10',
			category: 'Electronics',
		},
		{
			id: 5,
			name: 'Smart TV',
			price: 599.99,
			date: '2023-01-05',
			category: 'Electronics',
		},
		{
			id: 6,
			name: 'Gaming Console',
			price: 399.99,
			date: '2022-12-15',
			category: 'Electronics',
		},
	]

	const handleUserUpdate = (updatedUser: typeof user) => {
		setUser(updatedUser)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>User Profile</h1>
			<div className='flex flex-col md:flex-row gap-6'>
				{/* Left Column - 1/4 width */}
				<div className='w-full md:w-1/4 space-y-6'>
					<UserInfoCard user={user} onUserUpdate={handleUserUpdate} />
					<CategoryItemsCard category={categoryItems} />
				</div>
				{/* Right Column - 3/4 width */}
				<div className='w-full md:w-3/4'>
					<PastPurchasesCard purchases={pastPurchases} />
				</div>
			</div>
		</div>
	)
}
