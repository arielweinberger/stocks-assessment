import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/interval';

import { StockService } from '../stock.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-stocks-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
    private readonly STOCKS_REFRESH_INTERVAL = 5000;
    public tableColumns = ['uniqueSymbol', 'name', 'price', 'lastUpdate'];
    public dataSource: MatTableDataSource<Stock>;

    constructor (private router: Router,
                 private stockService: StockService) {
    }

    ngOnInit () {
        this.loadStocks();

        Observable.interval(this.STOCKS_REFRESH_INTERVAL)
            .filter(() => window.location.pathname === '/list')
            .subscribe(() => this.loadStocks());
    }

    public goToCreateStock () {
        this.router.navigate(['create']);
    }

    private loadStocks () {
        this.stockService.getAllStocks().subscribe((stocks) => this.dataSource = new MatTableDataSource(stocks));
    }
}
