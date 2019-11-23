export interface DataStorage {
	saveValue(key: string, value: string): Promise<string>;

	getValue(key: string): Promise<string>;
}
