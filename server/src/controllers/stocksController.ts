import { Stock } from '@app/factory';
import { StockManager } from '@app/managers';
import { Request, RequestHandler, Response } from 'express';
import * as logger from 'winston';

const getAllStocks: RequestHandler = (req: Request, res: Response): void => {
    const stocks: Stock[] = StockManager.getAllStocks();
    res.status(200).json(stocks);
};

const getOneStock: RequestHandler = (req: Request, res: Response): void => {
    try {
        const stock: Stock = StockManager.getStockById(req.params.id);
        res.status(200).json(stock);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
};

const updateStockPrice: RequestHandler = (req: Request, res: Response): void => {
    try {
        const stock: Stock = StockManager.updateStockPrice(req.params.id, req.params.price);
        res.status(200).json(stock);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
};

const createStock: RequestHandler = (req: Request, res: Response): void => {
    // TODO: validate input data
};

export default {
    getAllStocks,
    getOneStock,
    updateStockPrice,
    createStock
};
