import { Stock } from '@app/factory';
import { HttpError } from '@app/shared/HttpError';
import { mockStocks } from '@app/shared/mockStocks';
import * as logger from 'winston';

class StockManager {
    private stocks: Map<number, Stock> = new Map();

    public loadMockStocks (): void {
        logger.info('Loading mock stocks...');

        mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
            this.stocks.set(idx, new Stock(idx, stock.name, stock.uniqueSymbol));
        });

        logger.info(`Loaded ${mockStocks.length} mock stocks`);
    }

    public getStockById (id: string): Stock {
        if (!this.isStringNumeric(id)) {
            throw new HttpError(405, `Stock ID "${id}" is not valid`);
        }

        const stock: Stock = this.stocks.get(parseInt(id, 0));
        if (!stock) {
            throw new HttpError(404, `Stock with ID "${id}" could not be found`);
        }
        return stock;
    }

    /*
        This method is required because native isNaN method does not accept strings (TypeScript error),
        and parseInt strips letters. Therefore this is the only reliable (TS-friendly) way to check if a
        string is only numeric.
     */
    private isStringNumeric (str: string): boolean {
        return /^\d+$/.test(str);
    }
}

export default new StockManager();
