var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Controller, Post } from '@overnightjs/core';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import SaleScheduler from '../utils/SaleScheduler.js';
let default_1 = class default_1 {
    logger;
    saleScheduler;
    pocketBase;
    constructor({ logger, pocketBase }) {
        this.logger = logger.getChildLogger({ name: 'ProductShareAPI' });
        this.pocketBase = pocketBase;
        this.saleScheduler = new SaleScheduler({ pocketBase, logger });
    }
    async createSale(req, res) {
        this.logger.info(req.body);
        this.logger.info(req.params);
        this.logger.info(req.query);
        try {
            const sale = await this.pocketBase.Records.create('sales', req.body);
            this.saleScheduler.add(sale);
            return res.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED });
        }
        catch (err) {
            this.logger.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
};
__decorate([
    Post()
], default_1.prototype, "createSale", null);
default_1 = __decorate([
    Controller('api/sales')
], default_1);
export default default_1;
