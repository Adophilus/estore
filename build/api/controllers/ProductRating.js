var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Controller, Put } from '@overnightjs/core';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
let default_1 = class default_1 {
    logger;
    pocketBase;
    constructor({ pocketBase, logger }) {
        this.logger = logger.getChildLogger({ name: 'ProductRatingAPI' });
        this.pocketBase = pocketBase;
    }
    async createProductRating(req, res) {
        const { id: productId } = req.params;
        try {
            this.logger.info(req.body);
            const review = await this.pocketBase.Records.create('product_reviews', { creator: req.body.creator, stars: req.body.stars, review: req.body.review });
            const product = await this.pocketBase.Records.getOne('products', productId, { expand: 'stats' });
            const reviews = [...product['@expand'].stats.reviews, review.id];
            const rating = { ...product['@expand'].stats.rating };
            rating.stars[`${req.body.stars}`] += 1;
            rating.average = Object.keys(rating.stars).map(star => parseInt(star) * rating.stars[`${star}`]).reduce((prev, next) => prev + next) / Object.keys(rating.stars).map(star => rating.stars[`${star}`]).reduce((prev, next) => prev + next);
            await this.pocketBase.Records.update('product_stats', product.stats, { reviews, rating });
            return res.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
        }
        catch (err) {
            this.logger.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
};
__decorate([
    Put(':id')
], default_1.prototype, "createProductRating", null);
default_1 = __decorate([
    Controller('api/products/rating')
], default_1);
export default default_1;
