var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Controller, Get } from '@overnightjs/core';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
let default_1 = class default_1 {
    logger;
    pocketBase;
    constructor({ pocketBase, logger }) {
        this.logger = logger.getChildLogger({ name: 'ProductAnalyticsAPI' });
        this.pocketBase = pocketBase;
    }
    async getProduct(req, res) {
        const { id: productId } = req.params;
        try {
            const product = await this.pocketBase.Records.getOne('products', productId, { expand: 'stats' });
            await this.pocketBase.Records.update('product_stats', product['@expand'].stats.id, {
                trending: product['@expand'].stats.trending + 1,
                views: product['@expand'].stats.views + 1,
            });
            return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        }
        catch (err) {
            this.logger.error(err);
        }
    }
};
__decorate([
    Get(':id')
], default_1.prototype, "getProduct", null);
default_1 = __decorate([
    Controller('api/products/analytics')
], default_1);
export default default_1;
