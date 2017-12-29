/*
tslint:disable ordered-imports no-import-side-effect
 */
import 'module-alias/register'; // Must be loaded first, therefore "ordered-imports" rule is disabled.
import * as express from 'express';
import * as logger from 'winston';
import { StockManager } from '@app/managers';
import { Application } from 'express-serve-static-core';

const app: Application = express();

function initialize (): void {
    StockManager.loadMockStocks();

    app.listen(3000, () => {
        logger.info('Application running on port 3000...');
    });
}

initialize();
