
const generateFile = (name: string, extension: string, content: string) => ({
  [`${name}.${extension}`]: content,
});

const generateComponentContent = (componentName: string, hasProps: boolean = false) => {
  const componentType = hasProps ? `FC<${componentName}Props> (props)` : `FC ()`;
  const propsImport = hasProps ? `import { ${componentName}Props } from './types';` : '';
  const componentImport = `import { FC } from 'react';\n${propsImport}`;
  const componentDeclaration = `
    \nconst ${componentName}: ${componentType} => {\n
    ${hasProps ? '\tconst { } = props;\n' : '\n'}
    \n\treturn <div>${componentName} Component</div>;\n};\n
    \nexport default ${componentName};\n
  `;
  return componentImport + componentDeclaration;
};

const generateTypesContent = (componentName: string) => `interface ${componentName}Props {\n\n};\n\nexport { ${componentName}Props };`;

const generateTestContent = (componentName: string) => {
  const testImport = `import { render } from '@testing-library/react';\nimport ${componentName} from './${componentName}';\n`;
  const testDeclaration = `
    \ntest('renders ${componentName}', () => {\n
    \tconst { getByText } = render(<${componentName} />);\n
    \texpect(getByText('${componentName} Component')).toBeInTheDocument();\n});\n
  `;
  return testImport + testDeclaration;
};

const generateComponentFiles = (componentName: string, hasProps: boolean = false) => {
  const files = {
    ...generateFile(componentName, 'tsx', generateComponentContent(componentName, hasProps)),
    ...(hasProps ? generateFile('types', 'ts', generateTypesContent(componentName)) : {}),
    ...generateFile(`${componentName}.test`, 'tsx', generateTestContent(componentName)),
  };
  return files;
};


export { generateComponentFiles };