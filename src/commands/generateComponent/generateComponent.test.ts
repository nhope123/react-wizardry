import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it, vi, Mock } from 'vitest';
import * as vscode from 'vscode';
import {
	createFilesWithContent,
	getComponentName,
	getCurrentWorkspaceFolders,
	getTargetFolder,
} from '../helpers/vscodeHelpers.ts';
import generateComponent from './generateComponent.ts';

vi.mock('fs');
vi.mock('path');
vi.mock('../helpers/vscodeHelpers');
vi.mock('./componentTemplateUtils', () => ({
	generateComponentFiles: vi.fn(() => ({})),
}));

describe('generateComponent', () => {
	it('should return if no workspace folder is found', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue(null);
		await generateComponent();
		expect(getCurrentWorkspaceFolders).toHaveBeenCalled();
	});

	it('should return if no component name is provided', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue('workspaceFolder');
		(getComponentName as Mock).mockResolvedValue(null);
		await generateComponent();
		expect(getComponentName).toHaveBeenCalled();
	});

	it('should return if no target folder is selected', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue('workspaceFolder');
		(getComponentName as Mock).mockResolvedValue('TestComponent');
		(getTargetFolder as Mock).mockResolvedValue(null);
		await generateComponent();
		expect(getTargetFolder).toHaveBeenCalled();
	});

	it('should prompt to overwrite if component folder exists', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue('workspaceFolder');
		(getComponentName as Mock).mockResolvedValue('TestComponent');
		(getTargetFolder as Mock).mockResolvedValue('targetFolder');
		(fs.existsSync as Mock).mockReturnValue(true);
		(vscode.window.showQuickPick as Mock).mockResolvedValue('Yes');
		await generateComponent();
		expect(vscode.window.showQuickPick).toHaveBeenCalledWith(['Yes', 'No'], {
			placeHolder:
				'The folder TestComponent already exists. Do you want to overwrite it?',
		});
	});

	it('should cancel operation if user chooses not to overwrite existing folder', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue('workspaceFolder');
		(getComponentName as Mock).mockResolvedValue('TestComponent');
		(getTargetFolder as Mock).mockResolvedValue('targetFolder');
		(fs.existsSync as Mock).mockReturnValue(true);
		(vscode.window.showQuickPick as Mock).mockResolvedValue('No');
		await generateComponent();
		expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
			'Operation cancelled.'
		);
	});

	it('should create component folder and files', async () => {
		(getCurrentWorkspaceFolders as Mock).mockReturnValue('workspaceFolder');
		(getComponentName as Mock).mockResolvedValue('TestComponent');
		(getTargetFolder as Mock).mockResolvedValue('targetFolder');
		(fs.existsSync as Mock).mockReturnValue(false);
		await generateComponent();
		expect(fs.mkdirSync).toHaveBeenCalledWith(
			path.join('targetFolder', 'TestComponent')
		);
		expect(createFilesWithContent).toHaveBeenCalled();
		expect(vscode.window.showInformationMessage).toHaveBeenCalledWith(
			'Component TestComponent created successfully!'
		);
	});
});
