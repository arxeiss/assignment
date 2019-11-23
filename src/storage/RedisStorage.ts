import { Service } from 'typedi';
import { DataStorage } from './DataStorage';
import { createHandyClient } from 'handy-redis';

@Service({ id: 'dataStorage' })
export class RedisStorage implements DataStorage {
	public async saveValue(key: string, value: string): Promise<string> {
		const client = this.getRedisClient();
		const result = await client.set(key, value);
		await client.quit();

		return result;
	}

	public async getValue(key: string): Promise<string> {
		const client = this.getRedisClient();
		const val = await client.get(key);
		await client.quit();

		return val;
	}

	private getRedisClient() {
		return createHandyClient({
			host: process.env.REDIS_HOST || '127.0.0.1',
			port: +(process.env.REDIS_PORT || 6379),
			url: process.env.REDIS_URL || null,
			prefix: process.env.REDIS_PREFIX || null
		});
	}
}
