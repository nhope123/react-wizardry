import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import {
	createFilesWithContent,
	findDirectory,
	getComponentName,
	getCurrentWorkspaceFolders,
	getTargetFolder,
	showQuickPick,
} from '../helpers/vscodeHelpers.ts';
import { generateHookFiles } from './hookTemplateUtils.ts';

const regex = /^use/i;

const generateHook = async () => {
	const workspaceFolders = getCurrentWorkspaceFolders();
	if (!workspaceFolders) {
		return null;
	}

	// Get hook name
	let hookName = await getComponentName(
		'Enter Hook Name. (eg. State)',
		'Hook Name cannot be empty'
	);

	if (hookName) {
		if (regex.test(hookName)) {
			hookName = hookName.charAt(0).toLowerCase() + hookName.slice(1);
		} else {
			hookName = 'use' + hookName;
		}
	} else if (!hookName) {
		vscode.window.showErrorMessage(
			'Operation cancelled: Unsatisfied hook name.'
		);
		return;
	}

	const hasUseState =
		(await showQuickPick(['Yes', 'No'], 'Should have useState?')) === 'Yes';
	const hasUseEffect =
		(await showQuickPick(['Yes', 'No'], 'Should have useEffect?')) === 'Yes';

	// Get destination folder
	let hooksFolder = await findDirectory('hooks');

	if (!hooksFolder) {
		hooksFolder = await getTargetFolder([
			{
				path: 'src/hooks',
				option: 'src/hooks',
			},
		]);

		if (!hooksFolder) {
			vscode.window.showErrorMessage(
				'Operation cancelled: Target folder error.'
			);
			return;
		}
	}

	// Create the folder for the new component
	const componentFolderPath = path.join(hooksFolder, hookName);
	fs.mkdirSync(componentFolderPath);

	// generate hook files
	const files = generateHookFiles(hookName, hasUseState, hasUseEffect);

	// Create each file with its corresponding content
	createFilesWithContent(componentFolderPath, files);

	vscode.window.showInformationMessage(
		`Custom hook ${hookName} created successfully!`
	);
};

export default generateHook;
