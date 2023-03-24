/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "www.gravatar.com",
      "https://shopify-fnf3.onrender.com",
    ],
  },
};

module.exports = nextConfig;
