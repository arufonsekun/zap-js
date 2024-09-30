
/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: () => [
        {
            'source': '/api/v1/users',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-cache'
            }
            ]
        }
    ]
};

export default nextConfig;
