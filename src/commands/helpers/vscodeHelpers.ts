import * as vscode from 'vscode';

export const isWorkspaceConfigured = () => {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (!workspaceFolders) {
		vscode.window.showErrorMessage('Please open a folder first.');
	}
	return Boolean(workspaceFolders);
};

export const showQuickPick = async (options: string[], placeHolder: string) => {
  return await vscode.window.showQuickPick(options,	{ placeHolder });
};

export const showInputBox = async (prompt: string, invalidText: string) => {
  return await vscode.window.showInputBox({
    prompt,
    validateInput: (input) => (input ? null : invalidText),
  });
};
