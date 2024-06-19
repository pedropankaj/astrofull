import create from "zustand";

export const usePostStore = create((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  getPostBySlug: (slug) => get().posts.find((post) => post.slug === slug),
}));
