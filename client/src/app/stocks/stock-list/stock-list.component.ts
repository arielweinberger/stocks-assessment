import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { StockService } from '../stock.service';

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
        setInterval(() => this.loadStocks(), this.STOCKS_REFRESH_INTERVAL);
    }

    public goToCreateStock () {
        this.router.navigate(['create']);
    }

    private loadStocks () {
        this.stockService.getAllStocks().subscribe((stocks) => this.dataSource = new MatTableDataSource(stocks));
    }
}
