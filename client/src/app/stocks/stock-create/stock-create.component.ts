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
    public customError: string;

    constructor (private router: Router,
                 private stockService: StockService,
                 private feedbackService: FeedbackService) {
    }

    ngOnInit () {
        this.createForm();
    }

    /**
     * Navigate to the stock list page.
     */
    public goToStockList () {
        this.router.navigate(['list']);
    }

    /**
     * Create a new stock based on the form values.
     */
    public onSubmit () {
        this.customError = '';

        this.stockService.createStock(this.name.value, this.uniqueSymbol.value, this.price.value)
            .subscribe(() => {
                this.feedbackService.send(`Stock "${this.name.value}" has been created!`)
                this.goToStockList();
            }, error => this.processErrors(error));
    }

    /**
     * Create form controls and bind them to the component's form group.
     */
    private createForm () {
        this.name = new FormControl('', Validators.required);
        this.uniqueSymbol = new FormControl('', Validators.required);
        this.price = new FormControl('', Validators.required);

        this.form = new FormGroup({ name: this.name, uniqueSymbol: this.uniqueSymbol, price: this.price });
    }

    /**
     * Process an errors object.
     * If status code is 422, therefore validation errors, bind them to a form field.
     * Otherwise, set a "general" error.
     * @param error
     */
    private processErrors (error) {
        const data = error.error;

        /*
         *  When validation errors occur, the server returns error code 422 (processable entity).
         *  We will use the error code to determine what to do with the errors.
         */
        if (error.status === 422) {
            Object.entries(data).forEach(([field, errorData]) => this.form.controls[field].setErrors({ backend: errorData.msg }));
        } else {
            this.customError = data;
        }
    }
}
