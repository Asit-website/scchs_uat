/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET:"Instacertify",
    NEXTAUTH_URL:"https://elegant-melba-dec3f8.netlify.app/",
    next:{
      api_url:"https://elegant-melba-dec3f8.netlify.app/api/v1/"
    },
    // "proxy": "https://admin.instacertify.com",
    server : {
		path:"https://uat.scchs.co.in/",
   		api:"https://uat.scchs.co.in/api/",
      	jwt_secret:"UOUkeFnqauTf3qw0Hy6pv1JQq572l82gRBgnNbemPEjV2bTG2Bg0A3avm1svL9gs"
    }
  },
  reactStrictMode: false,
  experimental: {
      scrollRestoration: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['uat.scchs.co.in','cdn11.bigcommerce.com'],
  }
}

module.exports = nextConfig