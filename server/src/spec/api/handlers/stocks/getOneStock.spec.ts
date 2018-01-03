/**
 * @file getOneStock handler tests
 * @author Ariel Weinberger
 */
import getOneStock from '@app/api/handlers/stocks/getOneStock';
import { Stock } from '@app/factory';
import StockManager from '@app/managers/StockManager';
import { MockResponse } from '@spec/api/handlers/MockResponse';
import Spy = jasmine.Spy;

const handler: Function = getOneStock.handler;

describe('getAllStocks.handler', () => {
    let stocks: Stock[];
    let jsonSpy: Spy;
    let res: MockResponse;

    beforeEach(() => {
        StockManager.loadMockStocks();
        stocks = StockManager.getAllStocks();
        res = new MockResponse();
        jsonSpy = spyOn(res, 'json').and.callThrough();
    });

    it('returns one stock if valid ID is provided', () => {
        const targetStock: Stock = StockManager.stocks.get(1);
        handler({ params: { id: 1 } }, res);

        expect(jsonSpy).toHaveBeenCalledWith(targetStock);
    });

    it('throws an error if an invalid stock ID is provided', () => {
        spyOn(res, 'status').and.callThrough();
        handler({ params: { id: 23 } }, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith('Could not find any stock with ID 23');
    });
});
