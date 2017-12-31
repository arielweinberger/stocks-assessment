import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {
  public tableColumns = ['uniqueSymbol', 'name', 'price', 'lastUpdate'];
  public dataSource = new MatTableDataSource(MOCK_DATA);

  constructor() { }

  ngOnInit() {
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
