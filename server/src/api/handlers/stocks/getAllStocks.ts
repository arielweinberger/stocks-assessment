/**
 * @file getAllStocks (GET /api/stocks/) route validators and handler definition
 * @author Ariel Weinberger
 */

import { Stock } from '@app/factory';
import { StockManager } from '@app/managers';
import { Request, Response } from 'express';
import { ValidationChain } from 'express-validator/check';

const validators: ValidationChain[] = [];

function handler (req: Request, res: Response): void {
    const stocks: Stock[] = StockManager.getAllStocks();
    res.status(200).json(stocks);
}

export default {
    validators,
    handler
};
