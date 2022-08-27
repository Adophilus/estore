import ProductAnalyticsApiController from './controllers/ProductAnalytics.js';
import ProductShareApiController from './controllers/ProductShare.js';
import SaleController from './controllers/Sale.js';
import { Server } from '@overnightjs/core';
import cors from 'cors';
import bodyParser from 'body-parser';
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
        const props = { logger: this.logger, pocketBase: this.pocketBase };
        super.addControllers([
            new ProductAnalyticsApiController(props),
            new ProductShareApiController(props),
            new SaleController(props)
        ]);
        this.errorPages();
    }
    setupConfig() {
        this.logger = new Logger({ name: 'EStore' });
        this.pocketBase = new PocketBase(process.env.POCKETBASE_URL);
        const adminCreds = process.env.POCKETBASE_ADMIN.split(':');
        this.pocketBase.Admins.authViaEmail(adminCreds[0], adminCreds[1]);
    }
    setupMiddleWare() {
        this.app.set('views', 'src/api/views');
        this.app.set('view engine', 'pug');
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.locals.pocketBase = this.pocketBase;
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
