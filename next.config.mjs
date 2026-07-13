/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      // разрешаем изображения из MinIO (обложки/файлы), если бэкенд отдаёт по HTTP
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
