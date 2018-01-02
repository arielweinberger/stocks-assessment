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

    public getStock (stockId: number): Observable<Stock> {
        return this.httpClient.get<Stock>(`${this.URL}/${stockId}`);
    }

    public getAllStocks (): Observable<Stock[]> {
        return this.httpClient.get<Stock[]>(this.URL);
    }

    public createStock (name: string, uniqueSymbol: string, price: string): Observable<{}> {
        return this.httpClient.post(this.URL, { name, uniqueSymbol, price });
    }

    public updateStockPrice (stockId: number, price: number): Observable<{}> {
        return this.httpClient.put(`${this.URL}/${stockId}`, { price })
            .do(() => this.stockUpdate.next(stockId));
    }
}
