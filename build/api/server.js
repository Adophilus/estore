import ProductApiController from './controllers/Product.js';
import { Server } from '@overnightjs/core';
import * as dotenv from 'dotenv';
import PocketBase from 'pocketbase';
import { Logger } from 'tslog';
export default class EStoreServer extends Server {
    SERVER_START_MSG = 'Server running on port: ';
    logger;
    pocketBase;
    constructor() {
        super();
        this.setupConfig();
        this.setupMiddleWare();
        super.addControllers(new ProductApiController());
        this.errorPages();
    }
    setupConfig() {
        this.logger = new Logger({ name: 'EStore' });
        this.pocketBase = new PocketBase(process.env.POCKETBASE_URL);
        const adminCreds = process.env.POCKETBASE_ADMIN.split(':');
        this.pocketBase.Admins.authViaEmail(adminCreds[0], adminCreds[1]);
    }
    setupMiddleWare() {
        this.app.use((req, res, next) => {
            res.locals.pocketBase = this.pocketBase;
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
dotenv.config();
new EStoreServer().start(parseInt(process.env.SERVER_PORT));
