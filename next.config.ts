/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [],
    },
    experimental: {
        optimizePackageImports: ['@/components'],
    },
};

export default nextConfig;
