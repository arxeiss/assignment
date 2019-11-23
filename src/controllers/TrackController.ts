import { JsonController, Post, Body, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { TrackService } from '../services/TrackService';
import { Response } from 'express';

@Service()
@JsonController()
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Post('/track')
	public async trackContent(@Body() trackingData: any, @Res() response: Response): Promise<Response> {
		await this.trackService.processTrackingData(trackingData);

		return response.sendStatus(200);
	}
}
