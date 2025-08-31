// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Outras configurações que você possa ter...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', // '/**' permite qualquer caminho de imagem nesse host
      },
      // Você pode adicionar outros domínios confiáveis aqui
      // Exemplo para Unsplash:
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },
};

module.exports = nextConfig;