import Container, { Service } from 'typedi';
import { DataStorage } from '../storage/DataStorage';

export const CounterStorageKey = 'tracking_counter';

@Service({
	factory: () => new CounterService(Container.get('dataStorage'), CounterStorageKey)
})
export class CounterService {
	constructor(private dataStorage: DataStorage, private readonly storageKey: string) {}

	public async increaseCounter(amount: number): Promise<void> {
		const currentValue = await this.getCounterValue();

		await this.dataStorage.saveValue(this.storageKey, '' + (currentValue + amount));
	}

	public async getCounterValue(): Promise<number> {
		const currentValue = await this.dataStorage.getValue(this.storageKey);

		if (currentValue) {
			return +currentValue;
		}

		return 0;
	}
}
