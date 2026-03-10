// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mirfou111.vercel.app',
  integrations: [mdx(), sitemap()],

  vite: {
    // Tailwind v4 se place ici, dans la configuration Vite
    plugins: [tailwindcss()],
  },
});