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

    beforeEach(() => {
        stocks = StockManager.getAllStocks();
    });

    it('returns all stocks', () => {
        const res: MockResponse = new MockResponse();
        const jsonSpy: Spy = spyOn(res, 'json').and.callThrough();
        handler({ params: {} }, res);

        expect(jsonSpy).toHaveBeenCalledWith(stocks);
    });
});
