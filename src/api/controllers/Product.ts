import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';

@Controller('api/products/analytics')
export default class {
	@Get(':id')
    private getProduct (req: Request, res: Response) {
    	res.status(OK).json({
    		'message': 'all done!'
    	})
    }
}
