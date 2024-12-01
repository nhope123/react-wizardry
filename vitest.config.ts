import { defineConfig } from 'vitest/config';

export default defineConfig({
  
	test: {
		globals: true,
		environment: 'node',
		mockReset: true,
	},
	resolve: {
		alias: {
      vscode: './__mocks__/vscode.ts', // Point `vscode` to a mock file
    },
	}
});
