import * as fs from 'fs';
import * as path from 'path';

export class FileSystemUtils {
	static ensureDirectoryExistence(filePath: string) {
		const dirname = path.dirname(filePath);
		if (fs.existsSync(dirname)) {
			return true;
		}
		fs.mkdirSync(dirname, { recursive: true });
	}
}
