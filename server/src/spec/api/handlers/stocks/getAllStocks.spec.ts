/**
 * @file getAllStocks handler tests
 * @author Ariel Weinberger
 */
import getAllStocks from '@app/api/handlers/stocks/getAllStocks';
import { Stock } from '@app/factory';
import StockManager from '@app/managers/StockManager';
import { MockResponse } from '@spec/api/handlers/MockResponse';
import Spy = jasmine.Spy;

const handler: Function = getAllStocks.handler;

describe('getAllStocks.handler', () => {
    let stocks: Stock[];
    let res: MockResponse;
    let statusSpy: Spy;
    let jsonSpy: Spy;

    beforeEach(() => {
        StockManager.loadMockStocks();
        stocks = StockManager.getAllStocks();
        res = new MockResponse();
        statusSpy = spyOn(res, 'status').and.callThrough();
        jsonSpy = spyOn(res, 'json').and.callThrough();
    });

    it('returns all stocks', () => {
        handler({ params: {} }, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(stocks);
    });
});
