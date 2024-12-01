import eslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';

export default [
	{
		languageOptions: {
			parser: eslintParser,
			parserOptions: {
				ecmaVersion: 6,
				sourceType: 'module',
			},
		},

		plugins: {
			'@typescript-eslint': eslintPlugin,
		},
		rules: {
			// ...eslintPlugin.rules,
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: 'import',
					format: ['camelCase', 'PascalCase'],
				},
			],
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			curly: 'warn',
			eqeqeq: 'warn',
			'no-throw-literal': 'warn',
		},
        files: ['src/**/*.ts', 'src/**/*.tsx'],
		ignores: [
			'out/**',
			'dist/**',
			'**/*.d.ts',
			'node_modules/**',
            '.vscode/**',
            '.vscode-test/**',
            // '.vscode-test'
		],
        
	},
];
