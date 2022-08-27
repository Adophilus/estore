class SaleScheduler {
    pocketBase;
    logger;
    constructor({ pocketBase, logger }) {
        this.pocketBase = pocketBase;
        this.logger = logger.getChildLogger({ name: 'SaleScheduler' });
    }
    add(sale) {
        const timeout = Date.now() - sale.starting || 0;
        setTimeout(() => {
            this.start(sale);
        }, timeout);
        this.logger.info(`Scheduling sale ${sale.id} to begin in ${timeout} seconds`);
    }
    async start(sale) {
        this.logger.info(`Starting sale ${sale.id}...`);
        for (let page = 1; page > 0; page++) {
            const products = (await this.pocketBase.Records.getList('products', page, 50, { expand: 'stats' })).items;
            if (!products)
                break;
            for (const product of products) {
                if (product.stats.sale.discount > 0) {
                    this.logger.info(`putting product ${product.id} on sale...`);
                    await this.pocketBase.Records.update('products', product.id, { ...product, onSale: true });
                }
            }
        }
        await this.pocketBase.Records.update("sales", sale.id, sale);
        setTimeout(() => {
            this.end(sale);
        }, Date.now() - sale.starting + sale.duration);
    }
    async end(sale) {
        this.logger.info(`Ending sale ${sale.id}...`);
        for (let page = 1; page > 0; page++) {
            const products = (await this.pocketBase.Records.getList('products', page, 50, { expand: 'stats' })).items;
            if (!products)
                break;
            for (const product of products) {
                this.logger.info(`Removing product ${product.id} from sale...`);
                await this.pocketBase.Records.update('products', product.id, { ...product, onSale: false });
            }
        }
    }
}
export default SaleScheduler;
