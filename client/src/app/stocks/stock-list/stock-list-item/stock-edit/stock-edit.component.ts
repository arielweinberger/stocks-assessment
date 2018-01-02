import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StockService } from '../../../stock.service';
import { FeedbackService } from '../../../../shared/feedback.service';

@Component({
    selector: 'app-stock-edit',
    templateUrl: './stock-edit.component.html',
    styleUrls: ['./stock-edit.component.scss'],
    providers: [DecimalPipe]
})
export class StockEditComponent implements OnInit {
    @Input() id: number;
    public form: FormGroup;
    public price: FormControl;

    constructor (private decimalPipe: DecimalPipe,
                 private stockService: StockService,
                 private feedbackService: FeedbackService) {
    }

    ngOnInit () {
        this.price = new FormControl('', Validators.required);
        this.form = new FormGroup({ price: this.price });
    }

    public savePrice () {
        this.stockService.updateStockPrice(this.id, this.price.value)
            .subscribe(
                () => this.feedbackService.send('Stock price has been updated successfully!'),
                error => this.price.setErrors({ backend: error.error.price.msg })
            );
    }
}
