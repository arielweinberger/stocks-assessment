import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StockService {
    private readonly URL = 'http://localhost:3000/api/stocks';

    constructor (private httpClient: HttpClient) {}

    getAllStocks () {
        return this.httpClient.get<Stock[]>(this.URL);
    }

    createStock (name: string, uniqueSymbol: string, price: string) {
        return this.httpClient.post(this.URL, { name, uniqueSymbol, price });
    }
}
