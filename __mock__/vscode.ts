
import { vi } from 'vitest';
export const commands = {
  registerCommand: vi.fn(),
};

export const window = {
  showInformationMessage: vi.fn(),
};

export const workspace = {
  getConfiguration: vi.fn(() => ({
    get: vi.fn(),
  })),
};

export const Uri = {
  file: vi.fn(),
};

// Add other VS Code APIs your tests require
