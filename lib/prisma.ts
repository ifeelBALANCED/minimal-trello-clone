import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
