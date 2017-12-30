/**
 * @file updateStockPrice (PUT /api/stocks/:id/:price) route validators and handler definition
 * @author Ariel Weinberger
 */

import { Stock } from '@app/factory';
import { StockManager } from '@app/managers';
import { Request, Response } from 'express';
import { check, ValidationChain, validationResult } from 'express-validator/check';
import { Result } from 'express-validator/shared-typings';

const validators: ValidationChain[] = [
    check('id', 'Invalid stock ID').isNumeric(),
    check('price', 'Stock price must be numeric and greater than 0')
        .isNumeric()
        .custom((value: string) => parseFloat(value) > 0)
];

function handler (req: Request, res: Response): Response {
    const validationErrors: Result = validationResult(req);

    if (!validationErrors.isEmpty()) {
        return res.status(422).json(validationErrors.mapped());
    }

    try {
        const stock: Stock = StockManager.getStockById(parseInt(req.params.id, 0));
        stock.setPrice(parseFloat(req.params.price));
        res.status(200).json(stock);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export default {
    validators,
    handler
};
