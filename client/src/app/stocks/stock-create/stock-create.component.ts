import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';

@Component({
    selector: 'app-stock-create',
    templateUrl: './stock-create.component.html',
    styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
    public form: FormGroup;

    constructor (private router: Router,
                 private stockService: StockService) {
    }

    ngOnInit () {
        this.form = new FormGroup({
            name: new FormControl(),
            uniqueSymbol: new FormControl(),
            price: new FormControl()
        });
    }

    public goToStockList () {
        this.router.navigate(['list']);
    }

    public onSubmit () {
        const stock = this.form.value;
        this.stockService.createStock(stock.name, stock.uniqueSymbol, stock.price)
            .subscribe(() => {
                this.goToStockList();
            });
    }
}
