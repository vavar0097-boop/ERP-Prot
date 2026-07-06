import { PrismaClient, ProductUnit } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultLocation = await prisma.stockLocation.upsert({
    where: { code: "GUDANG-UTAMA" },
    update: {},
    create: {
      code: "GUDANG-UTAMA",
      name: "Gudang Utama",
      address: "Lokasi stok utama",
    },
  });

  const wfCategory = await prisma.productCategory.upsert({
    where: { code: "WF" },
    update: {},
    create: {
      code: "WF",
      name: "Wide Flange",
    },
  });

  const product = await prisma.product.upsert({
    where: { sku: "WF-100-50-5-7-12M" },
    update: {},
    create: {
      sku: "WF-100-50-5-7-12M",
      name: "Besi WF 100x50x5x7 12M",
      categoryId: wfCategory.id,
      type: "BESI_PROFIL",
      shapeProfile: "WF",
      sizeText: "100x50x5x7",
      lengthMm: 12000,
      weightKgPerPiece: 112.8,
      unit: ProductUnit.BATANG,
      minimumStock: 10,
    },
  });

  await prisma.stock.upsert({
    where: {
      productId_locationId: {
        productId: product.id,
        locationId: defaultLocation.id,
      },
    },
    update: {},
    create: {
      productId: product.id,
      locationId: defaultLocation.id,
      quantity: 25,
    },
  });

  await prisma.customerPriceLevel.upsert({
    where: { code: "B2C" },
    update: {},
    create: {
      code: "B2C",
      name: "Retail B2C",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
