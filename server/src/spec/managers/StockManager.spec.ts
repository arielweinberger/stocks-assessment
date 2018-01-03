/**
 * @file StockManager tests
 * @author Ariel Weinberger
 */
import { Stock } from '@app/factory';
import { mockStocks } from '@app/lib/mockStocks';
import { StockManager } from '@app/managers';
import Spy = jasmine.Spy;

describe('StockManager', () => {
    beforeEach(() => {
        StockManager.loadMockStocks();
    });

    afterEach(() => {
    });

    describe('loadMockStocks', () => {
        it('loads stocks from the mock repository', () => {
            mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
                expect(StockManager.stocks.get(idx).name).toEqual(stock.name);
                expect(StockManager.stocks.get(idx).uniqueSymbol).toEqual(stock.uniqueSymbol);
            });
        });
    });

    describe('getAllStocks', () => {
        it('returns all stocks in the storage as an array', () => {
            const stocks: Stock[] = StockManager.getAllStocks();
            mockStocks.forEach((stock: { name: string, uniqueSymbol: string }, idx: number) => {
                expect(stocks[idx].name).toEqual(stock.name);
                expect(stocks[idx].uniqueSymbol).toEqual(stock.uniqueSymbol);
            });
        });
    });

    describe('getStockById', () => {
        it('returns a stock by the provided id if successful', () => {
            const stock: Stock = StockManager.getStockById(1);
            expect(stock.name).toEqual('Twitter');
        });

        it('throws an error if stock was not found', () => {
            expect(() => StockManager.getStockById(10)).toThrowError('Could not find any stock with ID 10');
        });
    });

    describe('addStock', () => {
        it('creates a new stock, adds it to the storage and returns it', () => {
            const stock: Stock = StockManager.addStock('Test stock', 'TST', 2.2);

            expect(StockManager.stocks.get(5)).toEqual(stock);
            expect(stock instanceof Stock).toBeTruthy();
            expect(stock.name).toEqual('Test stock');
            expect(stock.uniqueSymbol).toEqual('TST');
            expect(stock.price).toEqual(2.2);
        });

        it('throws an error if stock with a similar name or symbol exists', () => {
            const error: string = 'Stock with the same name and/or symbol already exists';
            // Name already exists
            expect(() => StockManager.addStock('Facebook', 'TST', 1)).toThrowError(error);
            // Symbol already exists
            expect(() => StockManager.addStock('New name', 'FB', 1)).toThrowError(error);
            // Unique name and symbol, should not throw
            expect(() => StockManager.addStock('New name', 'SMTH', 1)).not.toThrowError(error);
        });
    });
});
