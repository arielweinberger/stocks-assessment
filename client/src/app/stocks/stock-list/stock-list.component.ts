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

        /*
         * Set up an interval to automatically reload stock if the following conditions are met:
         * - User is in the stock list page (/list)
         * - Auto refresh is enabled
         * - No stock items are being edited (otherwise user will be interrupted)
         */
        Observable.interval(this.STOCKS_REFRESH_INTERVAL)
            .filter(() => this.getWindowPathname() === '/list')
            .filter(() => this.autoRefresh === true)
            .filter(() => !this.hasItemsInEditMode())
            .subscribe(() => this.loadStocks());

        // When any single stock price is updated, reload all stocks.
        this.stockService.stockUpdate
            .subscribe(() => this.loadStocks());
    }

    /**
     * Navigate to the create page.
     */
    public goToCreateStock () {
        this.router.navigate(['create']);
    }

    /**
     * Set auto refresh mode. If set to true, load stocks immediately.
     * @param {{checked: boolean}} toggle
     */
    public onAutoRefreshToggle (toggle) {
        this.autoRefresh = toggle.checked;

        if (this.autoRefresh === true) {
            this.loadStocks();
        }
    }

    /**
     * Load stocks and apply them in the component.
     */
    private loadStocks () {
        this.stockService.getAllStocks().subscribe((stocks) => {
            this.stocks = stocks;
        });
    }

    /**
     * Check if there is any stock in edit mode.
     * @returns {boolean} - true if found, false otherwise.
     */
    private hasItemsInEditMode (): boolean {
        return this.stockItems._results.some(item => item.edit);
    }

    /**
     * Get current window path name
     * (this is necessary for unit testing)
     * @returns {string}
     */
    private getWindowPathname (): string {
        return window.location.pathname;
    }
}
