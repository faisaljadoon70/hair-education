/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Strict mode for better development
  reactStrictMode: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Enable image optimization
  images: {
    domains: ['cmvssothyxnkldrmxdcb.supabase.co'],
  },
}

module.exports = nextConfig
