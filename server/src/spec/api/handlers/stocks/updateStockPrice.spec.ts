/**
 * @file updateStockPrice handler tests
 * @author Ariel Weinberger
 */
import updateStockPrice from '@app/api/handlers/stocks/updateStockPrice';
import { Stock } from '@app/factory';
import StockManager from '@app/managers/StockManager';
import { MockResponse } from '@spec/api/handlers/MockResponse';
import Spy = jasmine.Spy;

const handler: Function = updateStockPrice.handler;

describe('getAllStocks.handler', () => {
    let stocks: Stock[];
    let statusSpy: Spy;
    let jsonSpy: Spy;
    let res: MockResponse;

    beforeEach(() => {
        StockManager.loadMockStocks();
        stocks = StockManager.getAllStocks();
        res = new MockResponse();
        statusSpy = spyOn(res, 'status').and.callThrough();
        jsonSpy = spyOn(res, 'json').and.callThrough();
    });

    it('updates stock price', () => {
        const stock: Stock = StockManager.getStockById(1);
        stock.price = 10;
        handler({ params: { id: 1 }, body: { price: 2.24 } }, res);
        expect(stock.price).toEqual(2.24);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(stock);
    });

    it('throws an error if an invalid stock ID is provided', () => {
        handler({ params: { id: 23 }, body: { price: 23 } }, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith('Could not find any stock with ID 23');
    });
});
