import { Request, RequestHandler, Response } from 'express';
import * as logger from 'winston';

const getAllStocks: RequestHandler = (req: Request, res: Response): void => {
    logger.info('GET getAllStocks');
};

const getOneStock: RequestHandler = (req: Request, res: Response): void => {
    logger.info('GET getOneStock');
    // TODO: validate ID
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
