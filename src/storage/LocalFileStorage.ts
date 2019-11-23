import { Service } from 'typedi';
import { FileStorage } from './FileStorage';
import fs from 'fs-extra';

@Service({ id: 'fileStorage' })
export class LocalFileStorage implements FileStorage {
	public addToFile(path: string, data: any): Promise<void> {
		return fs.appendFile(path, data);
	}
}
