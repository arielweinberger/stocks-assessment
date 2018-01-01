import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { FeedbackService } from '../../shared/feedback.service';

@Component({
    selector: 'app-stock-create',
    templateUrl: './stock-create.component.html',
    styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
    public form: FormGroup;
    public name: FormControl;
    public uniqueSymbol: FormControl;
    public price: FormControl;

    constructor (private router: Router,
                 private stockService: StockService,
                 private feedbackService: FeedbackService) {
        this.createForm();
    }

    ngOnInit () {
    }

    public goToStockList () {
        this.router.navigate(['list']);
    }

    public onSubmit () {
        this.stockService.createStock(this.name.value, this.uniqueSymbol.value, this.price.value)
            .subscribe(() => {
                this.feedbackService.send(`Stock "${this.name.value}" has been created!`)
                this.goToStockList();
            }, (error) => this.processErrors(error));
    }

    private createForm () {
        this.name = new FormControl('', Validators.required);
        this.uniqueSymbol = new FormControl('', Validators.required);
        this.price = new FormControl('', Validators.required);

        this.form = new FormGroup({ name: this.name, uniqueSymbol: this.uniqueSymbol, price: this.price });
    }

    private processErrors (error) {
        const data = error.error;

        /*
         *  When validation errors occur, the server returns error code 422 (processable entity).
         *  We will use the error code to determine what to do with the errors.
         */
        if (error.status === 422) {
            Object.entries(data).forEach(([field, errorData]) => this.form.controls[field].setErrors({ backend: errorData.msg }));
        } else {
            console.log(error);
        }
    }
}
