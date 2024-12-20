import { createFileObject } from "../helpers/generatorHelpers";
import { FileObject } from "../helpers/types";

/**
 * Generates the source code for a React functional component.
 *
 * @param componentName - The name of the component to be created.
 * @param hasProps - A boolean indicating whether the component will receive props. Defaults to false.
 * @returns The source code string for the React functional component.
 *
 * The generated component will:
 * - Import the necessary React types.
 * - Conditionally import the component's props type if `hasProps` is true.
 * - Define the component as a functional component, optionally typed with props.
 * - Return a simple JSX element containing the component's name.
 * - Export the component as the default export.
 */
const createComponentSource = (
	componentName: string,
	hasProps: boolean = false
): string => {
	const componentFunctionType = hasProps
		? `FC<${componentName}Props> = (props)`
		: `FC = ()`;
	const conditionalPropsImport = hasProps
		? `\nimport { ${componentName}Props } from './types';\n`
		: '\n';
	const componentImportStatement = `import { FC } from 'react';${conditionalPropsImport}`;
	const createComponentDeclaration = `
const ${componentName}: ${componentFunctionType} => {
  ${hasProps ? 'const { } = props;\n' : ''}
  return <div>${componentName} Component</div>;\n};
  \nexport default ${componentName};
  `;

	return componentImportStatement + createComponentDeclaration;
};

/**
 * Generates a TypeScript interface definition for the props of a given component.
 *
 * @param componentName - The name of the component for which the props interface is being created.
 * @returns A string representing the TypeScript interface definition for the component's props.
 */
const createComponentPropsDefinition = (componentName: string): string =>
	`interface ${componentName}Props {\n\n};\n\nexport { ${componentName}Props };`;

/**
 * Generates the content for a component test file.
 *
 * This function creates a string containing the necessary imports and a basic test
 * for rendering a React component using the `@testing-library/react` library.
 *
 * @param componentName - The name of the component to generate the test for.
 * @returns A string containing the test file content for the specified component.
 */
const createComponentTestContent = (componentName: string): string => {
	const componentTestImport = `import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ${componentName} from './${componentName}';
`;
	const renderTestDeclaration = `
describe('${componentName}', () => {  
  it('renders ${componentName}', () => {
    const { getByText } = render(<${componentName} />);\n
    expect(getByText('${componentName} Component')).toBeInTheDocument();
  });
});
`;

	return componentTestImport + renderTestDeclaration;
};

/**
 * Generates the necessary files for a React component.
 *
 * @param componentName - The name of the component to generate files for.
 * @param hasProps - A boolean indicating whether the component has props. Defaults to `false`.
 * @returns An object containing the generated files.
 */
const generateComponentFiles = (
	componentName: string,
	hasProps: boolean = false
): FileObject => {
	const filesToGenerate = {
		...createFileObject(
			componentName,
			'tsx',
			createComponentSource(componentName, hasProps)
		),
		...(hasProps
			? createFileObject(
					'types',
					'ts',
					createComponentPropsDefinition(componentName)
			  )
			: {}),
		...createFileObject(
			`${componentName}.test`,
			'tsx',
			createComponentTestContent(componentName)
		),
	};

	return filesToGenerate;
};

export {
	createComponentPropsDefinition,
	createComponentSource,
	createComponentTestContent,
	generateComponentFiles
 };
