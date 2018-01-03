/*
tslint:disable align
 */

/**
 * @file Stock factory tests
 * @author Ariel Weinberger
 */

import { Stock } from '@app/factory';

describe('Stock', () => {
    let stock: Stock;

    beforeEach(() => {
        stock = new Stock(17, 'My stock', 'STK', 4.23);
    });

    it('constructs the stock instance', () => {
        expect(stock.id).toEqual(17);
        expect(stock.name).toEqual('My stock');
        expect(stock.uniqueSymbol).toEqual('STK');
        expect(stock.price).toEqual(4.23);
        expect(stock.lastUpdate instanceof Date).toBeTruthy();
    });

    describe('setPrice', () => {
        it('sets the price of a stock and update "lastUpdate"', () => {
            const oldDate: Date = stock.lastUpdate;
            expect(stock.price).toEqual(4.23);

            // Fast forward clock to get a different date (jasmine.clock() doesn't help here)
            setTimeout(() => {
                stock.setPrice(10);
                expect(stock.price).toEqual(10);
                expect(stock.lastUpdate).not.toEqual(oldDate);
            }, 0);
        });
    });
});
