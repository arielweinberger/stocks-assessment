import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stock-create',
    templateUrl: './stock-create.component.html',
    styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
    public form: FormGroup;

    constructor (private router: Router) {
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
        console.log(this.form.value);
    }
}
