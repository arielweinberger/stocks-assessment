/**
 * @file createStock handler tests
 * @author Ariel Weinberger
 */
import createStock from '@app/api/handlers/stocks/createStock';
import { Stock } from '@app/factory';
import StockManager from '@app/managers/StockManager';
import { MockResponse } from '@spec/api/handlers/MockResponse';
import Spy = jasmine.Spy;

const handler: Function = createStock.handler;

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

    it('creates a stock', () => {
        handler({
            body: {
                name: 'New stock',
                uniqueSymbol: 'STK',
                price: '2.2'
            }
        }, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(StockManager.getStockById(5));
    });

    it('throws an error if stock with similar name already exists', () => {
        handler({
            body: {
                name: 'Facebook', // name exists
                uniqueSymbol: 'STK',
                price: '2.2'
            }
        }, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith('Stock with the same name and/or symbol already exists');
    });

    it('throws an error if stock with similar symbol already exists', () => {
        handler({
            body: {
                name: 'New stock',
                uniqueSymbol: 'FB', // symbol exists
                price: '2.2'
            }
        }, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith('Stock with the same name and/or symbol already exists');
    });
});
