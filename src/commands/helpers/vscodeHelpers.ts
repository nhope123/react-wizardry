import * as vscode from 'vscode';

export const getCurrentWorkspaceFolders = () => {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (!workspaceFolders) {
		vscode.window.showErrorMessage('Please open a folder first.');
	}
	return workspaceFolders;
};

export const showQuickPick = async (options: string[], placeHolder: string) => {
	return await vscode.window.showQuickPick(options, { placeHolder });
};

export const showInputBox = async (prompt: string, invalidText: string) => {
	return await vscode.window.showInputBox({
		prompt,
		validateInput: (input) => (input ? null : invalidText),
	});
};

export const findDirectory = async (name: string): Promise<string | null> => {
	const workspaceFolders = getCurrentWorkspaceFolders();
	if (!workspaceFolders) {
		return null;
	}

	for (const folder of workspaceFolders) {
		const directory = await vscode.workspace.findFiles(
			new vscode.RelativePattern(folder, `**/${name}`)
		);
		if (directory.length > 0) {
			return directory[0].fsPath;
		}
	}

	return null;
};

export const getComponentName = async (prompt: string, invalidText: string) => {
  // Prompt the user for the component name
  let componentName = await showInputBox(prompt, invalidText);

  if (!componentName) {
    return; // User canceled the input
  } else {
    componentName = componentName
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
      .join('');
  }

  return componentName;
};
