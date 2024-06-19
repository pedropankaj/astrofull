import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), auth(), tailwind()],
  adapter: vercel(),
  experimental: {
    actions: true,
  },
  devToolbar: {
    enabled: false,
  },
});
