"use server";

import { Project } from "@prisma/client";
import { prisma } from "./utils";

export const getAllFiles = async () => {
  const files = await prisma.file.findMany();
  return files;
};

export const createNewProject = async (project: Omit<Project, "id">) => {
  try {
    const r = prisma.project.create({
      data: project,
    });
    Promise.resolve(r);
  } catch (error) {
    console.error(error);
    Promise.reject(error);
  }
};
