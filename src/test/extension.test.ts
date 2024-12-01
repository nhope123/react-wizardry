
import * as vscode from 'vscode';

jest.mock('vscode')

describe('Extension Test Suite', () => {
	test('Sample test', () => {
		expect(2).toEqual(2);
	});

	test('should register createComponent command', () => {
		 vscode.commands.getCommands(true).then(commands => {
			expect(commands).toContain('react-wizardry.createComponent');
		});
	});

	test('should register createHook command', () => {
		 vscode.commands.getCommands(true).then(commands => {
			expect(commands).toContain('react-wizardry.createHook');
		});
	});

});

jest.restoreAllMocks();

