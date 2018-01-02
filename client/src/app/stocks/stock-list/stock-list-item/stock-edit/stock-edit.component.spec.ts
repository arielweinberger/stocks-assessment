import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEditComponent } from './stock-edit.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material.module';
import { StockService } from '../../../stock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeedbackService } from '../../../../shared/feedback.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

fdescribe('StockEditComponent', () => {
    let component: StockEditComponent;
    let fixture: ComponentFixture<StockEditComponent>;
    let stockService;
    let feedbackService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StockEditComponent
            ],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                StockService,
                FeedbackService
            ]
        }).compileComponents();

        stockService = TestBed.get(StockService);
        feedbackService = TestBed.get(FeedbackService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockEditComponent);
        component = fixture.componentInstance;
        component.price = new FormControl();
        component.id = 0;
        fixture.detectChanges();
    });

    describe('Initialization', () => {
        it('initializes the component', () => {
            component.ngOnInit();

            expect(component.price).toBeDefined();
            expect(component.price instanceof FormControl).toBeTruthy();
            expect(component.form).toBeDefined();
            expect(component.form instanceof FormGroup).toBeTruthy();
            expect(component.form.controls.price).toBe(component.price);
        });
    });

    describe('savePrice', () => {
        let updateStockPriceSpy;
        let sendFeedbackSpy;

        beforeEach(() => {
            updateStockPriceSpy = spyOn(stockService, 'updateStockPrice');
            sendFeedbackSpy = spyOn(feedbackService, 'send');
            component.ngOnInit();
        });

        it('calls to update stock price and sends feedback when successful', () => {
            updateStockPriceSpy.and.returnValue(Observable.of({}));

            component.price.setValue(10);
            component.savePrice();
            expect(updateStockPriceSpy).toHaveBeenCalledWith(0, 10);
            expect(sendFeedbackSpy).toHaveBeenCalledWith('Stock price has been updated successfully!');
            expect(component.price.errors).toBeNull();
        });

        it('calls to update stock price and handles error when failed', () => {
            const error = {
                error: {
                    price: {
                        msg: 'Some error message'
                    }
                }
            };

            updateStockPriceSpy.and.returnValue(Observable.throw(error));

            component.price.setValue(10);
            component.savePrice();
            expect(updateStockPriceSpy).toHaveBeenCalledWith(0, 10);
            expect(sendFeedbackSpy).not.toHaveBeenCalled();
            expect(component.price.errors).toEqual({ backend: error.error.price.msg });
        });
    });
});
