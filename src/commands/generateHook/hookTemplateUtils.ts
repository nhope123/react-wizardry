import { capitalize, createFileObject } from "../helpers/generatorHelpers.js";
import { FileObject } from "../helpers/types.js";

const createHookSource = (hookName: string, hasState: boolean, hasEffect: boolean): string => {
  const stateImport = hasState || hasEffect ? `import { ${hasState ? 'useState,' : ''} ${hasEffect ? 'useEffect' : ''} } from 'react';\n` : '';
  const stateDeclaration = hasState ? `const [state, setState] = useState<>(null);\n` : '';
  const effectDeclaration = hasEffect ? `useEffect(() => {\n    // effect logic\n  }, []);\n` : '';

  return (
`${stateImport}import { ${capitalize(hookName)}ReturnType } from './types';

const ${hookName} = (): ${capitalize(hookName)}ReturnType  => {
  ${stateDeclaration}
  ${effectDeclaration}  
  return {};
};

export default ${hookName};
`);
};

const createHookTestContent = (hookName: string): string => {
  return `import { renderHook } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';
import ${hookName} from './${hookName}';

describe('${hookName}', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => ${hookName}());
    expect(result.current).toBeDefined();
  });
});
`;
};

const createHookTypeDefinition = (hookName: string): string => {
  return `export type ${capitalize(hookName)}ReturnType = {
  // define return type here
};
`;
};

const generateHookFiles = (hookName: string, hasState: boolean = false, hasEffect: boolean = false): FileObject => {
  const filesToGenerate = {
    ...createFileObject(
      hookName,
      'ts',
      createHookSource(hookName, hasState, hasEffect)
    ),
    ...createFileObject(
      `${hookName}.test`,
      'ts',
      createHookTestContent(hookName)
    ),
    ...createFileObject(
      'types',
      'ts',
      createHookTypeDefinition(hookName)
    ),
  };

  return filesToGenerate;
};

export { generateHookFiles };