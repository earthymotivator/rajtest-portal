const config = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rajtest.in',
      },
    ],
  },
};

export default config;
