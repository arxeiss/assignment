import { LocalFileStorage } from '../../src/storage/LocalFileStorage';
import fs from 'fs-extra';

const TestingFilePath = '__jest_test_file.log';

describe('Local File storage', () => {
	beforeEach(async () => {
		if (await fs.pathExists(TestingFilePath)) {
			await fs.remove(TestingFilePath);
		}
	});

	afterEach(async () => {
		if (await fs.pathExists(TestingFilePath)) {
			await fs.remove(TestingFilePath);
		}
	});

	it('Appending to file', async () => {
		const fileStorage = new LocalFileStorage();
		const firstInsert = 'tracking1',
			secondInsert = 'tracking2';

		await fileStorage.addToFile(TestingFilePath, firstInsert);
		await expect(fs.pathExists(TestingFilePath)).resolves.toBeTruthy();

		await fileStorage.addToFile(TestingFilePath, secondInsert);

		const readContent = await new Promise<Buffer>((resolve, reject) => {
			fs.readFile(TestingFilePath, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});

		expect(readContent.toString()).toBe(firstInsert + secondInsert);
	});
});
