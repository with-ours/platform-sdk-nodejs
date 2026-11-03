import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@oursprivacy\/platform-sdk$/, replacement: `${src}/index.ts` },
      { find: /^@oursprivacy\/platform-sdk\/(.*)$/, replacement: `${src}/$1` },
    ],
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
