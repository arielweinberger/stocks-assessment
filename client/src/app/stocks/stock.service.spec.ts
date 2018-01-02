import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StockService', () => {
    let stockService: StockService;
    let httpMock: HttpTestingController;

    const mockStock: Stock = {
        id: 0,
        name: 'Mock Stock',
        uniqueSymbol: 'MKSTK',
        price: 1.1,
        lastUpdate: new Date()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StockService],
            imports: [HttpClientTestingModule]
        });

        stockService = TestBed.get(StockService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('updateStockPrice', () => {
        it('emits stockUpdate subject when stock update is successful', () => {
            const spy = spyOn(stockService.stockUpdate, 'next');

            stockService.updateStockPrice(mockStock.id, mockStock.price)
                .subscribe(() => {
                    expect(spy).toHaveBeenCalledWith(mockStock.id);
                });

            const req = httpMock.expectOne(`${stockService.URL}/${mockStock.id}`);
            expect(req.request.method).toBe('PUT');
            req.flush({ ...mockStock, price: 2 });
        });
    });
});
