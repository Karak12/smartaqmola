// Типизированная конфигурация из переменных окружения.
export interface AppConfig {
  port: number;
  corsOrigin: string;
  auth: {
    jwtSecret: string;
    jwtExpires: string;
    adminUsername: string;
    adminPassword: string;
    adminPasswordHash: string;
  };
  minio: {
    endPoint: string;
    port: number;
    useSSL: boolean;
    accessKey: string;
    secretKey: string;
    bucket: string;
    publicUrl: string;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
    jwtExpires: process.env.JWT_EXPIRES ?? '12h',
    adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
    adminPassword: process.env.ADMIN_PASSWORD ?? 'admin',
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? '',
  },
  minio: {
    endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
    port: parseInt(process.env.MINIO_PORT ?? '9000', 10),
    useSSL: (process.env.MINIO_USE_SSL ?? 'false') === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY ?? 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY ?? 'minioadmin',
    bucket: process.env.MINIO_BUCKET ?? 'smart-aqmola',
    publicUrl: process.env.MINIO_PUBLIC_URL ?? 'http://localhost:9000',
  },
});
