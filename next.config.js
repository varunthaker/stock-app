/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "png.pngtree.com",
    ],
  },
};

module.exports = nextConfig;
