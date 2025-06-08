/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8090/api/:path*',
            },
        ];
    },
    webpack: (config, { isServer }) => {
        // util._extend 경고 숨기기
        config.ignoreWarnings = [
            { module: /node_modules\/next\/dist\/compiled\/webpack\/bundle5\.js/ },
        ];
        return config;
    },
};

module.exports = nextConfig;
