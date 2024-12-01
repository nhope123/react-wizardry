import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  createFilesWithContent,
  getComponentName,
	getCurrentWorkspaceFolders,
	getTargetFolder,
	showQuickPick,
} from '../helpers/vscodeHelpers';
import { generateComponentFiles } from './componentTemplateUtils';

let generateComponent = async (): Promise<void> => {
	const workspaceFolder = getCurrentWorkspaceFolders();
	if (!workspaceFolder) {
		return;
	}	

	// Prompt the user for the component name
	const componentName = await getComponentName(
		'Enter the component name',
		'Component name cannot be empty'
	);

	if (!componentName) {
		return; // User canceled the input
	}

	// Ask if the component should have props
	const hasProps =
		(await showQuickPick(['Yes', 'No'], 'Does the component have props?')) ===
		'Yes';

	// Get target folder
	let targetFolderPath = await getTargetFolder();
  if (! targetFolderPath) {return;}

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
  createFilesWithContent(componentFolderPath, files);
	
	vscode.window.showInformationMessage(
		`Component ${componentName} created successfully!`
	);
};

export default generateComponent;
