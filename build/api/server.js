import ProductApiController from './controllers/Product.js';
import { Server } from '@overnightjs/core';
import { config } from 'dotenv';
import PocketBase from 'pocketbase';
import { Logger } from 'tslog';
class EStoreServer extends Server {
    SERVER_START_MSG = 'Server running on port: ';
    logger;
    pocketBaseClient;
    constructor() {
        super();
        this.setupConfig();
        this.setupMiddleWare();
        super.addControllers(new ProductApiController());
        this.errorPages();
    }
    setupConfig() {
        this.logger = new Logger({ name: 'EStore' });
        this.pocketBaseClient = new PocketBase(process.env.POCKETBASE_HOST);
    }
    setupMiddleWare() {
        this.app.use((req, res, next) => {
            res.locals.pocketBaseClient = this.pocketBaseClient;
            res.locals.logger = this.logger;
            next();
        });
    }
    start(port) {
        this.app.listen(port, () => {
            this.logger.info(this.SERVER_START_MSG + String(port));
        });
    }
    errorPages() {
        this.app.use((req, res) => res.status(404).json({ error: 'Route not found!' }));
    }
}
config();
new EStoreServer().start(parseInt(process.env.PORT));
