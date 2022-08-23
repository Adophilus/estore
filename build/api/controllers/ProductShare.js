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
    constructor({ logger }) {
        this.logger = logger.getChildLogger({ name: 'ProductShareAPI' });
    }
    async getProduct(req, res) {
        const { slug: productSlug } = req.params;
        const product = (await res.locals.pocketBase.Records.getList('products', 1, 1, {
            filter: `slug = '${productSlug}'`,
            expand: 'cover'
        })).items[0];
        if (!product)
            return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        return res.render('product/share', {
            product,
            pocketBaseURL: process.env.POCKETBASE_URL,
            frontendBaseUrl: process.env.FRONTEND_BASE_URL
        });
    }
};
__decorate([
    Get(':slug')
], default_1.prototype, "getProduct", null);
default_1 = __decorate([
    Controller('share/products')
], default_1);
export default default_1;
