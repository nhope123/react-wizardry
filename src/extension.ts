// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-wizardry.generateComponent', async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('Please open a folder first.');
      return;
    }

    // Prompt the user for the component name
    let componentName = await vscode.window.showInputBox({
      prompt: 'Enter the component name',
      validateInput: (input) => input ? null : 'Component name cannot be empty',
    });

    if (!componentName) {
      return; // User canceled the input
    } else {
			componentName = componentName[0].toUpperCase() + componentName.replace(/[^a-zA-Z0-9]/g, '').slice(1); // Remove special characters
		}

    // Let the user select a folder or use the active folder
    const selectedFolder = await vscode.window.showQuickPick(
      ['Current Folder', 'Select Folder'], 
      { placeHolder: 'Where do you want to create the component?' }
    );

    let targetFolderPath = workspaceFolders[0].uri.fsPath; // Default to root folder

    if (selectedFolder === 'Select Folder') {
      const folderUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: 'Select a folder',
      });

      if (folderUri && folderUri[0]) {
        targetFolderPath = folderUri[0].fsPath;
      } else {
        vscode.window.showErrorMessage('No folder selected. Operation cancelled.');
        return;
      }
    }

    // Create the folder for the new component
    const componentFolderPath = path.join(targetFolderPath, componentName);
    if (!fs.existsSync(componentFolderPath)) {
      fs.mkdirSync(componentFolderPath);
    }

    // Define the files and their contents
    const files = {
      [`${componentName}.tsx`]: `import React from 'react';\n\ntype Props = {};\n\nconst ${componentName}: React.FC<Props> = () => {\n  return <div>${componentName} Component</div>;\n};\n\nexport default ${componentName};`,
      [`${componentName}.test.tsx`]: `import React from 'react';\nimport { render } from '@testing-library/react';\nimport ${componentName} from './${componentName}';\n\ntest('renders ${componentName}', () => {\n  const { getByText } = render(<${componentName} />);\n  expect(getByText('${componentName} Component')).toBeInTheDocument();\n});`,
      [`types.ts`]: `// Define types for ${componentName} component here\n\nexport type Props = {};`,
    };

    // Create each file with its corresponding content
    for (const [fileName, content] of Object.entries(files)) {
      const filePath = path.join(componentFolderPath, fileName);
      fs.writeFileSync(filePath, content);
    }

    vscode.window.showInformationMessage(`Component ${componentName} created successfully!`);
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
