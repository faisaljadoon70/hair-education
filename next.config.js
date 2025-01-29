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

  // Enable experimental features
  experimental: {
    serverActions: true,
  },

  // Environment variables that should be exposed to the client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig
