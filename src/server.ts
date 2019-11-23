import { expressApp } from './app';

(async function() {
	const app = await expressApp();
	const port = process.env.PORT || 3000;

	app.listen(port, () => {
		console.debug(`App is running at http://localhost:${port} in mode: ${process.env.NODE_ENV}`);
	});
})().catch(error => console.error('Cannot initialize application!', error));
