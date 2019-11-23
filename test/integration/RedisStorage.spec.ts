import { RedisStorage } from '../../src/storage/RedisStorage';

const TestingRedisKey = 'jest_redis_key';

describe('Redis storage', () => {
	it('Saving and getting value', async () => {
		const client = new RedisStorage();

		const testValue1st = 'firstTestValue',
			testValue2nd = 'secondTestValue';

		await expect(client.saveValue(TestingRedisKey, testValue1st)).resolves.toBe('OK');
		await expect(client.getValue(TestingRedisKey)).resolves.toBe(testValue1st);

		await expect(client.saveValue(TestingRedisKey, testValue2nd)).resolves.toBe('OK');
		await expect(client.getValue(TestingRedisKey)).resolves.toBe(testValue2nd);
	});
});
