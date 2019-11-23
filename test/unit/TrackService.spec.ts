import { CounterService } from '../../src/services/CounterService';
import { TrackService } from '../../src/services/TrackService';
import { FileStorage } from '../../src/storage/FileStorage';
import fs from 'fs-extra';

describe('TrackingService', () => {
	const trackingFilePath = '__jest_test_tracking_file_path.log';
	let fileStorageMock: FileStorage;
	let counterServiceMock: CounterService;

	beforeEach(() => {
		const FileStorageMock = jest.fn<FileStorage, []>(() => ({
			addToFile: jest.fn((path: string, data: any) => Promise.resolve())
		}));
		fileStorageMock = new FileStorageMock();

		const CounterServiceMock = jest.fn<Partial<CounterService>, []>(() => ({
			increaseCounter: jest.fn((amount: number) => Promise.resolve())
		}));
		counterServiceMock = new CounterServiceMock() as CounterService;
	});

	it('Tracks content without count', async () => {
		const trackService = new TrackService(counterServiceMock, fileStorageMock, trackingFilePath);
		const requestBodyData = await fs.readJSON('test/fixtures/trackingRequest.json');

		await trackService.processTrackingData(requestBodyData);

		expect(fileStorageMock.addToFile).toHaveBeenCalledWith(trackingFilePath, JSON.stringify(requestBodyData));
		expect(counterServiceMock.increaseCounter).not.toHaveBeenCalled();
	});

	it('Tracks content with count attribute', async () => {
		const trackService = new TrackService(counterServiceMock, fileStorageMock, trackingFilePath);
		const requestBodyData = await fs.readJSON('test/fixtures/trackingRequestWithCount.json');

		await trackService.processTrackingData(requestBodyData);

		expect(fileStorageMock.addToFile).toHaveBeenCalledWith(trackingFilePath, JSON.stringify(requestBodyData));
		expect(counterServiceMock.increaseCounter).toHaveBeenCalled();
	});
});
