/** @type {import('next').NextConfig} */
import { withAxiom } from 'next-axiom'

const nextConfig = withAxiom({
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      }
    ]
  }
})

export default nextConfig
