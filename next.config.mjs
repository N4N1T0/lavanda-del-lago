/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		nextScriptWorkers: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fakestoreapi.com',
				port: '',
			},
		],
	},
}

export default nextConfig
