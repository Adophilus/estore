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
            if (product.onSale &&
                Date.now() <
                    product['@expand'].stats.sale.started +
                        product['@expand'].stats.sale.duration * 1000) {
                this.logger.info(`Product(id=${productId}) sale is currently going on!`);
                return res.status(StatusCodes.OK).end();
            }
            if (product['@expand'].stats.sale.counter <
                product['@expand'].stats.sale.limit) {
                product['@expand'].stats.sale.counter++;
                product.onSale = false;
                this.logger.info(`updating counter of Product(id=${productId})`);
                await this.pocketBase.Records.update('products', productId, product);
                await this.pocketBase.Records.update('product_stats', product['@expand'].stats.id, product['@expand'].stats);
                return res.status(StatusCodes.OK).end();
            }
            product.onSale = true;
            product['@expand'].stats.sale.counter = 0;
            product['@expand'].stats.sale.started = Date.now();
            this.logger.info(`setting random discount for Product(id=${productId})`);
            product['@expand'].stats.discount.active = Math.floor(Math.random() *
                (product['@expand'].stats.discount.max -
                    product['@expand'].stats.discount.min +
                    1) +
                product['@expand'].stats.discount.min);
            this.logger.info(`setting discount of ${product['@expand'].stats.discount.active}% on Product(id=${productId})`);
            await this.pocketBase.Records.update('products', productId, product);
            await this.pocketBase.Records.update('product_stats', product['@expand'].stats.id, product['@expand'].stats);
            return res.status(StatusCodes.OK).end();
        }
        catch (err) {
            this.logger.error(err);
            res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
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
