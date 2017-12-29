import { Stock } from '@app/factory';
import { StockManager } from '@app/managers';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as logger from 'winston';

const getAllStocks: RequestHandler = (req: Request, res: Response): void => {
    logger.info('GET getAllStocks');
};

const getOneStock: RequestHandler = (req: Request, res: Response): void => {
    logger.info('GET getOneStock');

    try {
        const stock: Stock = StockManager.getStockById(req.params.id);
        res.status(200).json(stock);
    } catch (error) {
        res.status(error.status);
    }
};

const updateStockPrice: RequestHandler = (req: Request, res: Response): void => {
    logger.info('PUT updateStock');
    // TODO: validate ID
};

const createStock: RequestHandler = (req: Request, res: Response): void => {
    logger.info('POST createStock');
    // TODO: validate input data
};

export default {
    getAllStocks,
    getOneStock,
    updateStockPrice,
    createStock
};
