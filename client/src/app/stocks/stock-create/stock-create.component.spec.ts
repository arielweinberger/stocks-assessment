import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreateComponent } from './stock-create.component';
import { MaterialModule } from '../../shared/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { FeedbackService } from '../../shared/feedback.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

describe('StockCreateComponent', () => {
    let component: StockCreateComponent;
    let fixture: ComponentFixture<StockCreateComponent>;
    let stockService: StockService;
    let feedbackService: FeedbackService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StockCreateComponent
            ],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                StockService,
                FeedbackService,
                { provide: Router, useValue: { navigate: () => {} } }
            ]
        }).compileComponents();

        stockService = TestBed.get(StockService);
        feedbackService = TestBed.get(FeedbackService);
        router = TestBed.get(Router);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('ngOnInit', () => {
        it('creates the create stock form', () => {
            component.ngOnInit();

            expect(component.name instanceof FormControl).toBeTruthy();
            expect(component.uniqueSymbol instanceof FormControl).toBeTruthy();
            expect(component.price instanceof FormControl).toBeTruthy();

            expect(component.form instanceof FormGroup).toBeTruthy();
            expect(component.form.controls.name).toBe(component.name);
            expect(component.form.controls.uniqueSymbol).toBe(component.uniqueSymbol);
            expect(component.form.controls.price).toBe(component.price);
        });
    });

    describe('onSubmit', () => {
        let createStockSpy;

        beforeEach(() => {
            createStockSpy = spyOn(stockService, 'createStock').and.callThrough();
            component.ngOnInit();
            component.name.setValue('Mock Stock');
            component.uniqueSymbol.setValue('MKSTK');
            component.price.setValue(10);
        });

        it('resets customError every call', () => {
            component.customError = 'Some error';
            component.onSubmit();
            expect(component.customError).toEqual('');
        });

        it('calls stockService.createStock with the form data', () => {
            component.onSubmit();
            expect(createStockSpy).toHaveBeenCalledWith('Mock Stock', 'MKSTK', 10);
        });

        describe('handle errors if stockService.createStock fails', () => {
            it('applies validation errors (status code 422) to the relevant form controls', () => {
                const error = {
                    name: { param: 'name', msg: 'Name field error test' },
                    uniqueSymbol: { param: 'uniqueSymbol', msg: 'Symbol field error test' }
                };
                createStockSpy.and.returnValue(Observable.throw({ status: 422, error }));

                component.onSubmit();
                expect(component.name.errors.backend).toEqual(error.name.msg);
                expect(component.uniqueSymbol.errors.backend).toEqual(error.uniqueSymbol.msg);
                expect(component.price.errors).toBeNull();
                expect(component.customError).toEqual('');
            });

            it('applies any non-validation error codes (not 422) to component.customError', () => {
                const error = 'Non-validation error test';
                createStockSpy.and.returnValue(Observable.throw({ status: 409, error }));

                component.onSubmit();
                expect(component.customError).toEqual(error);
                expect(component.form.invalid).toBeFalsy();
            });
        });
    });

    describe('goToStockList', () => {
        it('navigates to the "list" route', () => {
            spyOn(router, 'navigate');
            component.goToStockList();
            expect(router.navigate).toHaveBeenCalledWith(['list']);
        });
    });
});
