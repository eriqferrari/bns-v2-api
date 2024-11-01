/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.bulkmint.it',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
