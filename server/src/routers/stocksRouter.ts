import { stocksController } from '@app/controllers';
import { Router } from 'express';

export const stocksRouter: Router = Router()
    .get('/', stocksController.getAllStocks)
    .get('/:id', stocksController.getOneStock)
    .put('/:id', stocksController.updateStockPrice)
    .post('/', stocksController.createStock);
