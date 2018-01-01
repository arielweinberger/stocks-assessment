import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StockService {
    private readonly URL = 'http://localhost:3000/api/stocks';
    public stocksSubject: Subject<Stock[]>;

    constructor (private httpClient: HttpClient) {
        setTimeout(() => {

        }, 3000);
    }

    getAllStocks () {
        return this.httpClient.get<Stock[]>(this.URL);
    }
}
