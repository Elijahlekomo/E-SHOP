import { PrismaClient } from "@/prisma/generated/client";

declare global {
  var prisma: PrismaClient | undefined;
}
//new change
const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") globalThis.prisma = client;

//export * from "@/prisma/generated/client";
export default client;


