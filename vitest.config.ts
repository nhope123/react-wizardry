import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: 'node',
		mockReset: true,
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
			"@commands/*": new URL('./src/commands/', import.meta.url).pathname,
		}
	},
	resolve: {
		alias: {
      vscode: '/src/__mocks__/vscode.ts', // Point `vscode` to a mock file
    },
	},
	build: {
    rollupOptions: {
      external: ['fs', 'vscode', 'paths'], // Mark 'fs' as an external dependency
    },
  },
  define: {
    'process.env': {}, // Provide a fallback for process.env
  },
});
