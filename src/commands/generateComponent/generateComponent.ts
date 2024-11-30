import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getCurrentWorkspaceFolders, showInputBox, showQuickPick } from '../helpers/vscodeHelpers';
import { generateComponentFiles } from './helpers';

let generateComponent = async () => {
  const workspaceFolder = getCurrentWorkspaceFolders();
	if (!workspaceFolder) {
		return;
	}

	// Prompt the user for the component name
	let componentName = await showInputBox(
    'Enter the component name',
		'Component name cannot be empty'
  );

	if (!componentName) {
		return; // User canceled the input
	} else {
		componentName = componentName
			.replace(/[^a-zA-Z0-9]/g, ' ')
			.split(' ')
			.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
			.join('');
	}

	// Ask if the component should have props
	const hasProps =
		(await showQuickPick(['Yes', 'No'], 'Does the component have props?')) ===
		'Yes';

	// Let the user select a folder or use the active folder
	const selectedFolder = await showQuickPick(
		['Current Folder', 'Select Folder'],
		'Where do you want to create the component?'
	);

	let targetFolderPath = workspaceFolder[0].uri.fsPath; // Default to root folder

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
			vscode.window.showErrorMessage(
				'No folder selected. Operation cancelled.'
			);
			return;
		}
	}

	// Create the folder for the new component
	const componentFolderPath = path.join(targetFolderPath, componentName);
	if (fs.existsSync(componentFolderPath)) {
		const overwrite =
			(await vscode.window.showQuickPick(['Yes', 'No'], {
				placeHolder: `The folder ${componentName} already exists. Do you want to overwrite it?`,
			})) === 'Yes';

		if (!overwrite) {
			vscode.window.showErrorMessage('Operation cancelled.');
			return;
		} else {
			fs.rmdirSync(componentFolderPath, { recursive: true });
		}
	}

	fs.mkdirSync(componentFolderPath);

	// Define the files and their contents
	const files = generateComponentFiles(componentName, hasProps);

	// Create each file with its corresponding content
	for (const [fileName, content] of Object.entries(files)) {
		const filePath = path.join(componentFolderPath, fileName);
		fs.writeFileSync(filePath, content);
	}

	vscode.window.showInformationMessage(
		`Component ${componentName} created successfully!`
	);
};

export default generateComponent;
