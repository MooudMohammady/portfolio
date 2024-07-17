"use server";

import { prisma } from "./utils";

export const getAllFiles = async () => {
  const files = await prisma.file.findMany();
  return files;
};
