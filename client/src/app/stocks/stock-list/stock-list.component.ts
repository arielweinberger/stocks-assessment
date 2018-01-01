import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/interval';

import { StockService } from '../stock.service';

@Component({
    selector: 'app-stocks-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
    private readonly STOCKS_REFRESH_INTERVAL = 5000;
    public autoRefresh = true;
    public stocks: Stock[];

    constructor (private router: Router,
                 private stockService: StockService) {
    }

    ngOnInit () {
        this.loadStocks();

        Observable.interval(this.STOCKS_REFRESH_INTERVAL)
            .filter(() => window.location.pathname === '/list')
            .filter(() => this.autoRefresh === true)
            .subscribe(() => this.loadStocks());
    }

    public goToCreateStock () {
        this.router.navigate(['create']);
    }

    public onAutoRefreshToggle (data) {
        this.autoRefresh = data.checked;

        if (this.autoRefresh === true) {
            this.loadStocks();
        }
    }

    private loadStocks () {
        this.stockService.getAllStocks().subscribe((stocks) => {
            this.stocks = stocks;
        });
    }
}
