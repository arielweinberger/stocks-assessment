/*
tslint:disable insecure-random
 */

/**
 * @file StockManager singleton definition, instantiation and export.
 * @author Ariel Weinberger
 */

import { Stock } from '@app/factory';
import { HttpError } from '@app/lib/HttpError';
import { mockStocks } from '@app/lib/mockStocks';
import * as logger from 'winston';

/**
 * Stock manager class that stores stocks and provides
 * retrieval, creation and manipulation of stocks.
 */
class StockManager {
    private stocks: Map<number, Stock> = new Map();

    /**
     * Load mock stocks and add them to the storage map (stocks).
     */
    public loadMockStocks (): void {
        logger.info('Loading mock stocks...');

        const mockPrice: Function = (): number => Math.random() * 5;
        mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
            this.stocks.set(idx, new Stock(idx, stock.name, stock.uniqueSymbol, mockPrice()));
        });

        logger.info(`Loaded ${mockStocks.length} mock stocks`);
    }

    /**
     * Get all stocks from the stocks storage in the form of an array.
     * @returns {Stock[]} - Array of all stocks in the storage.
     */
    public getAllStocks (): Stock[] {
        return Array.from(this.stocks.values());
    }

    /**
     * Get a stock from the storage by its unique ID.
     * @param {number} id
     * @returns {Stock}
     */
    public getStockById (id: number): Stock {
        const stock: Stock = this.stocks.get(id);
        if (stock == null) {
            throw new HttpError(404, 'Could not find any stock with the provided ID');
        }

        return stock;
    }

    /**
     * Create a new stock and add it to the stocks storage.
     * @param {string} name
     * @param {string} uniqueSymbol
     * @param {number} price
     * @returns {Stock} - The newly created stock.
     */
    public addStock (name: string, uniqueSymbol: string, price: number): Stock {
        const stocksArray: Stock[] = Array.from(this.stocks.values());
        const exists: boolean = stocksArray.some((stock: Stock) => stock.name.toLowerCase() === name.toLowerCase() ||
            stock.uniqueSymbol === uniqueSymbol);
        if (exists) {
            throw new HttpError(409, 'Stock with the same name and/or symbol already exists');
        }

        const id: number = stocksArray.length;
        this.stocks.set(id, new Stock(id, name, uniqueSymbol, price));

        return this.stocks.get(id);
    }
}

export default new StockManager();
