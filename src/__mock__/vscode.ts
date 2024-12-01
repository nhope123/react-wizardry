
import { jest } from '@jest/globals';
export const commands = {
  registerCommand: jest.fn(),
};

export const window = {
  showInformationMessage: jest.fn(),
};

export const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn(),
  })),
};

export const Uri = {
  file: jest.fn(),
};

// Add other VS Code APIs your tests require
