import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class StockService {
    public stockUpdate: Subject<number> = new Subject();
    public readonly URL = 'http://localhost:3000/api/stocks';

    constructor (private httpClient: HttpClient) {
    }

    /**
     * Get a single stock.
     * @param {number} stockId
     * @returns {Observable<Stock>}
     */
    public getStock (stockId: number): Observable<Stock> {
        return this.httpClient.get<Stock>(`${this.URL}/${stockId}`);
    }

    /**
     * Get all stocks.
     * @returns {Observable<Stock[]>}
     */
    public getAllStocks (): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(this.URL);
    }

    /**
     * Create a new stock.
     * @param {string} name
     * @param {string} uniqueSymbol
     * @param {string} price
     * @returns {Observable<{}>}
     */
    public createStock (name: string, uniqueSymbol: string, price: string): Observable<{}> {
        return this.httpClient.post(this.URL, { name, uniqueSymbol, price });
    }

    /**
     * Update a stock's price and notify subscribers to stock price changes.
     * @param {number} stockId
     * @param {number} price
     * @returns {Observable<{}>}
     */
    public updateStockPrice (stockId: number, price: number): Observable<{}> {
        return this.httpClient.put(`${this.URL}/${stockId}`, { price })
            .do(() => this.stockUpdate.next(stockId));
    }
}
