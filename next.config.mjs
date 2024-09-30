/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    nextScriptWorkers: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      }
    ]
  }
}

export default nextConfig
