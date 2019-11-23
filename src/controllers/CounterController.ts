import { JsonController, Get, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { CounterService } from '../services/CounterService';
import { Response, response } from 'express';

@Service()
@JsonController()
export class TrackController {
	constructor(private counterService: CounterService) {}

	@Get('/count')
	public async getCounterValue(@Res() response: Response): Promise<Response> {
		const currentValue = await this.counterService.getCounterValue();

		return response.status(200).send({ counter: currentValue });
	}
}
