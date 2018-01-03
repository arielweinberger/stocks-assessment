/*
tslint:disable ordered-imports no-import-side-effect
 */

/**
 * @file Bootstraps the application.
 * @author Ariel Weinberger
 */
import 'module-alias/register'; // Must be loaded first, therefore "ordered-imports" rule is disabled.
import * as express from 'express';
import * as logger from 'winston';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { StockManager } from '@app/managers';
import { stocksRouter } from '@app/api/routers';
import { Request, Response } from 'express';

function initialize (): void {
    StockManager.loadMockStocks();

    const app: Application = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/', express.static(`${__dirname}/../public`));
    app.use('/api/stocks', stocksRouter);
    app.get('*', (req: Request, res: Response) => res.redirect('/'));

    app.listen(3000, () => logger.info('Application listening to port 3000'));
}

initialize();
