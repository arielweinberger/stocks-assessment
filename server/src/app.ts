/*
tslint:disable ordered-imports no-import-side-effect
 */
import 'module-alias/register'; // Must be loaded first, therefore "ordered-imports" rule is disabled.
import * as express from 'express';
import * as logger from 'winston';
import { Application, Router } from 'express';
import { StockManager } from '@app/managers';
import { stocksRouter } from '@app/routers';

function initialize (): void {
    StockManager.loadMockStocks();

    const app: Application = express();
    app.use('/api/stocks', stocksRouter);
    app.listen(3000, () => logger.info('Application listening to port 3000'));
}

initialize();
