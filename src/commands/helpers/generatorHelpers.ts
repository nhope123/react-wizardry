/**
 * Creates a file object with the specified name, extension, and content.
 *
 * @param name - The name of the file without the extension.
 * @param extension - The file extension.
 * @param content - The content to be included in the file.
 * @returns An object representing the file, with the key being the file name and extension, and the value being the content.
 */
export const createFileObject = (
	name: string,
	extension: string,
	content: string
) => ({
	[`${name}.${extension}`]: content,
});