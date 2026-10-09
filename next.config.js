/** @type {import('next').NextConfig} */
const nextConfig = {
  // StrictMode off — PeerJS double-mounts in dev cause duplicate peer IDs
  reactStrictMode: false,
};

module.exports = nextConfig;
