import 'reflect-metadata';
import { Container } from 'typedi';
import { createExpressServer, useContainer } from 'routing-controllers';
import dotenv from 'dotenv';
import { LocalFileStorage } from './storage/LocalFileStorage';
import { RedisStorage } from './storage/RedisStorage';

let app: any;
export const expressApp = async () => {
	if (app) {
		return app;
	}
	dotenv.config();

	Container.import([LocalFileStorage, RedisStorage]);

	useContainer(Container);
	const routingControllersOptions = {
		controllers: [__dirname + '/controllers/*{.js,.ts}']
	};

	app = createExpressServer(routingControllersOptions);

	return app;
};
