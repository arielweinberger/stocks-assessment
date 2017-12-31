/**
 * @file Stocks namespace routing definition (/api/stocks)
 * @author Ariel Weinberger
 */

import { Router } from 'express';

import createStock from '@app/api/handlers/stocks/createStock';
import getAllStocks from '@app/api/handlers/stocks/getAllStocks';
import getOneStock from '@app/api/handlers/stocks/getOneStock';
import updateStockPrice from '@app/api/handlers/stocks/updateStockPrice';

export const stocksRouter: Router = Router()
    .get('/', getAllStocks.validators, getAllStocks.handler)
    .get('/:id', getOneStock.validators, getOneStock.handler)
    .put('/:id', updateStockPrice.validators, updateStockPrice.handler)
    .post('/', createStock.validators, createStock.handler);
