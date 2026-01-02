import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/nzb-sources/',
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Add this line below:
      '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
});
