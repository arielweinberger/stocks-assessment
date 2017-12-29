import { Stock } from '@app/factory';
import { mockStocks } from '@app/shared/mockStocks';
import * as logger from 'winston';

class StockManager {
    private stocks: Map<number, Stock> = new Map();

    public loadMockStocks (): void {
        logger.info('Loading mock stocks...');

        mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
            this.stocks.set(stock.name, new Stock(idx, stock.name, stock.uniqueSymbol));
        });

        logger.info(`Loaded ${mockStocks.length} mock stocks`);
    }
}

export default new StockManager();
