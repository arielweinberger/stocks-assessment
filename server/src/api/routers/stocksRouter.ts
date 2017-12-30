/**
 * @file Stocks namespace routing definition (/api/stocks)
 * @author Ariel Weinberger
 */

import { Router } from 'express';

import createStock from '@app/handlers/stocks/createStock';
import getAllStocks from '@app/handlers/stocks/getAllStocks';
import getOneStock from '@app/handlers/stocks/getOneStock';
import updateStockPrice from '@app/handlers/stocks/updateStockPrice';

export const stocksRouter: Router = Router()
    .get('/', getAllStocks.validators, getAllStocks.handler)
    .get('/:id', getOneStock.validators, getOneStock.handler)
    .put('/:id/:price', updateStockPrice.validators, updateStockPrice.handler)
    .post('/', createStock.validators, createStock.handler);
