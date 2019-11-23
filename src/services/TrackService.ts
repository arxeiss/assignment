import Container, { Service } from 'typedi';
import { CounterService } from './CounterService';
import { FileStorage } from '../storage/FileStorage';

@Service({
	factory: () =>
		new TrackService(Container.get(CounterService), Container.get('fileStorage'), process.env.TRACKING_FILE_PATH)
})
export class TrackService {
	constructor(
		private counterService: CounterService,
		private fileStorage: FileStorage,
		private readonly trackingFilePath: string
	) {}

	public async processTrackingData(trackingData: any): Promise<void> {
		await this.saveTrackingDataIntoFile(trackingData);

		if (trackingData && trackingData.count !== undefined) {
			this.counterService.increaseCounter(+trackingData.count);
		}
	}

	private async saveTrackingDataIntoFile(trackingData: any): Promise<void> {
		return this.fileStorage.addToFile(this.trackingFilePath, JSON.stringify(trackingData));
	}
}
