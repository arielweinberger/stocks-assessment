import { Stock } from '@app/factory';
import * as logger from 'winston';

class StockManager {
    private stocks: Map<string, Stock> = new Map();

    public loadMockStocks (): void {
        logger.info('Loading mock stocks...');

        const mockStocks: { name: string, uniqueSymbol: string }[] = [
            { name: 'Facebook', uniqueSymbol: 'FB' },
            { name: 'Twitter', uniqueSymbol: 'TWTR' },
            { name: 'Google', uniqueSymbol: 'GOOGL' },
            { name: 'Amazon', uniqueSymbol: 'AMZN' },
            { name: 'Microsoft', uniqueSymbol: 'MSFT' }
        ];

        mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
            this.stocks.set(stock.name, new Stock(idx, stock.name, stock.uniqueSymbol));
        });

        logger.info(`Loaded ${mockStocks.length} mock stocks`);
    }
}

export default new StockManager();
