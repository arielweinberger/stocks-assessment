import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-stocks-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
    public tableColumns = ['uniqueSymbol', 'name', 'price', 'lastUpdate'];
    public dataSource = new MatTableDataSource(MOCK_DATA);

    constructor (private router: Router) {
    }

    ngOnInit () {
    }

    public goToCreateStock () {
        this.router.navigate(['create']);
    }
}

const MOCK_DATA = [
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' },
    { name: 'Facebook', uniqueSymbol: 'FB', price: 4.22, lastUpdate: 'now' }
];
