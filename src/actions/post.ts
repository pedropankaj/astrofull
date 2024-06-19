import { defineAction, z } from "astro:actions";
import prisma from "../../lib/prisma";

export const getAllPost = defineAction({
  handler: async () => {
    const post = await prisma.post.findMany();
    return post;
  },
});

export const getPost = defineAction({
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  },
});

export const createPost = defineAction({
  //accept: "form",
  input: z.object({
    title: z.string(),
    content: z.string(),
    slug: z.string().optional().nullable().default(null),
    isPublished: z.boolean(),
  }),
  handler: async ({ title, content, slug, isPublished }) => {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        isPublished,
      },
    });
    return post;
  },
});

export const updatePost = defineAction({
  //  accept: "form",
  input: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    slug: z.string().optional().nullable().default(null),
    isPublished: z.boolean(),
  }),
  handler: async ({ id, title, content, slug, isPublished }) => {
    console.log("ACTIOOOOOON", id);
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        isPublished,
      },
    });
    return post;
  },
});

export const deletePost = defineAction({
  accept: "form",
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const post = await prisma.post.delete({
      where: { id },
    });
    return post;
  },
});
