-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('new', 'in_progress', 'done', 'rejected');

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "date" JSONB NOT NULL,
    "title" JSONB NOT NULL,
    "tone" TEXT NOT NULL DEFAULT '#2563EB',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kpis" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#2563EB',
    "label" JSONB NOT NULL,
    "value" JSONB NOT NULL,
    "sub" JSONB NOT NULL,
    "delta" TEXT NOT NULL DEFAULT '',
    "deltaTone" TEXT NOT NULL DEFAULT 'up',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kpis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "tagline" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#2563EB',
    "status" JSONB NOT NULL,
    "year" TEXT NOT NULL,
    "area" JSONB NOT NULL,
    "tags" JSONB NOT NULL,
    "coverKey" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "ticket" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "status" "RequestStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procurement_docs" (
    "id" TEXT NOT NULL,
    "groupKey" TEXT NOT NULL,
    "label" JSONB NOT NULL,
    "meta" JSONB,
    "badge" JSONB,
    "fileKey" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procurement_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_ticket_key" ON "requests"("ticket");

-- CreateIndex
CREATE UNIQUE INDEX "assets_key_key" ON "assets"("key");
