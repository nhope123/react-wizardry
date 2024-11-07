import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { generateComponentFiles } from './helpers';

// fix error in import statement of the extension.ts file

let generateComponent = vscode.commands.registerCommand('react-wizardry.generateComponent', async () => {
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

  // Ask if the component should have props
  const hasProps = await vscode.window.showQuickPick(
    ['Yes', 'No'], 
    { placeHolder: 'Does the component have props?' }
  ) === 'Yes';

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
  const files = generateComponentFiles(componentName, hasProps);

  // Create each file with its corresponding content
  for (const [fileName, content] of Object.entries(files)) {
    const filePath = path.join(componentFolderPath, fileName);
    fs.writeFileSync(filePath, content);
  }

  vscode.window.showInformationMessage(`Component ${componentName} created successfully!`);
});

export default generateComponent;