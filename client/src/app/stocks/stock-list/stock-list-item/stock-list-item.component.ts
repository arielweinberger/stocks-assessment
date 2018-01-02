import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';

@Component({
    selector: 'app-stock-list-item',
    templateUrl: './stock-list-item.component.html',
    styleUrls: ['./stock-list-item.component.scss']
})
export class StockListItemComponent implements OnInit {
    @Input() stock: Stock;
    public edit = false;

    constructor (private stockService: StockService) {
    }

    ngOnInit () {
        this.stockService.stockUpdate
            .filter((stockId) => stockId === this.stock.id);
    }

    toggleEdit () {
        this.edit = !this.edit;
    }
}
