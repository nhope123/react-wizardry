import { describe, expect, it } from 'vitest';
import {
	createComponentPropsDefinition,
	createComponentSource,
	createComponentTestContent,
	generateComponentFiles,
} from './componentTemplateUtils';

describe('componentTemplateUtils', () => {
	describe('createComponentSource', () => {
		it('should generate source code for a component without props', () => {
			const componentName = 'TestComponent';
			const result = createComponentSource(componentName);
			expect(result).toContain(`const ${componentName}: FC = () => {`);
			expect(result).toContain(`return <div>${componentName} Component</div>;`);
		});

		it('should generate source code for a component with props', () => {
			const componentName = 'TestComponent';
			const result = createComponentSource(componentName, true);
			expect(result).toContain(
				`import { ${componentName}Props } from './types';`
			);
			expect(result).toContain(
				`const ${componentName}: FC<${componentName}Props> = (props) => {`
			);
		});
	});

	describe('createComponentPropsDefinition', () => {
		it('should generate props definition for a component', () => {
			const componentName = 'TestComponent';
			const result = createComponentPropsDefinition(componentName);
			expect(result).toBe(
				`interface ${componentName}Props {\n\n};\n\nexport { ${componentName}Props };`
			);
		});
	});

	describe('createComponentTestContent', () => {
		it('should generate test content for a component', () => {
			const componentName = 'TestComponent';
			const result = createComponentTestContent(componentName);
			expect(result).toContain(
				`import { render } from '@testing-library/react';`
			);
			expect(result).toContain(
				`import { describe, expect, it } from 'vitest';`
			);
			expect(result).toContain(`describe('${componentName}', () => {`);
			expect(result).toContain(
				`expect(getByText('${componentName} Component')).toBeInTheDocument();`
			);
		});
	});

	describe('generateComponentFiles', () => {
		it('should generate files for a component without props', () => {
			const componentName = 'TestComponent';
			const result = generateComponentFiles(componentName);
			expect(result).toHaveProperty(`${componentName}.tsx`);
			expect(result).toHaveProperty(`${componentName}.test.tsx`);
			expect(result).not.toHaveProperty('types.ts');
		});

		it('should generate files for a component with props', () => {
			const componentName = 'TestComponent';
			const result = generateComponentFiles(componentName, true);
			expect(result).toHaveProperty(`${componentName}.tsx`);
			expect(result).toHaveProperty(`${componentName}.test.tsx`);
			expect(result).toHaveProperty('types.ts');
		});
	});
});
