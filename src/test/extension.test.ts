import * as assert from 'assert';
// import * as myExtension from '../../extension';
describe('Extension Test Suite', () => {
    test('Sample test', () => {
        // assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        // assert.strictEqual(-1, [1, 2, 3].indexOf(0));
        expect(2).toEqual(2)
    });
});
// Restore the original vscode module after tests
