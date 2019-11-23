import { CounterService } from '../../src/services/CounterService';
import { DataStorage } from '../../src/storage/DataStorage';

describe('CounterService', () => {
	const counterKey = '__jest_test_counter_key';

	describe('getCounterValue', () => {
		const dataProvider = [
			[undefined, 0],
			['', 0],
			['123', 123]
		];
		test.each(dataProvider)('Value %s is returned as %d', async (storageValue: string, expectedValue: number) => {
			const DataStorageMock = jest.fn<DataStorage, []>(() => ({
				getValue: jest.fn((key: string) => Promise.resolve(storageValue)),
				saveValue: jest.fn((key: string, value: string) => Promise.resolve('OK'))
			}));

			const dataStorageMock = new DataStorageMock();
			const counterService = new CounterService(dataStorageMock, counterKey);

			await expect(counterService.getCounterValue()).resolves.toBe(expectedValue);
		});
	});

	describe('increaseCounter', () => {
		const dataProvider = [
			[undefined, 2, '2'],
			['', 6, '6'],
			['12', 9, '21']
		];
		test.each(dataProvider)(
			'Value %s is increased by %d which results into %s',
			async (storageValue: string, increaseAmount: number, savedValue: string) => {
				const DataStorageMock = jest.fn<DataStorage, []>(() => ({
					getValue: jest.fn((key: string) => Promise.resolve(storageValue)),
					saveValue: jest.fn((key: string, value: string) => Promise.resolve('OK'))
				}));

				const dataStorageMock = new DataStorageMock();
				const counterService = new CounterService(dataStorageMock, counterKey);

				await counterService.increaseCounter(increaseAmount);
				expect(dataStorageMock.saveValue).toHaveBeenCalledWith(counterKey, savedValue);
			}
		);
	});
});
