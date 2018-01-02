import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/interval';

import { StockService } from '../stock.service';
import { StockListItemComponent } from './stock-list-item/stock-list-item.component';

@Component({
    selector: 'app-stocks-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
    @ViewChildren(StockListItemComponent) stockItems;
    public autoRefresh = true;
    public stocks: Stock[];
    private readonly STOCKS_REFRESH_INTERVAL = 5000;

    constructor (private router: Router,
                 private stockService: StockService) {
    }

    ngOnInit () {
        this.loadStocks();

        Observable.interval(this.STOCKS_REFRESH_INTERVAL)
            .filter(() => window.location.pathname === '/list')
            .filter(() => this.autoRefresh === true)
            .filter(() => !this.hasItemsInEditMode())
            .subscribe(() => this.loadStocks());

        this.stockService.stockUpdate
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

    private hasItemsInEditMode() {
        return this.stockItems._results.some(item => item.edit);
    }
}
