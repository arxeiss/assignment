export interface FileStorage {
	addToFile(path: string, data: any): Promise<void>;
}
