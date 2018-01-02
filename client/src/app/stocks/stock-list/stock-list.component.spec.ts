///<reference path="../stock.service.ts"/>
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimeAgoPipe } from 'time-ago-pipe';
import { MaterialModule } from '../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StockListItemComponent } from './stock-list-item/stock-list-item.component';
import { StockListComponent } from './stock-list.component';
import { StockEditComponent } from './stock-list-item/stock-edit/stock-edit.component';
import { StockService } from '../stock.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import Spy = jasmine.Spy;
import { Router } from '@angular/router';

describe('StockListComponent', () => {
    let component: StockListComponent;
    let fixture: ComponentFixture<StockListComponent>;
    let stockService: StockService;
    let router: Router;

    const mockStocks: Stock[] = [
        { id: 0, name: 'Stock A', uniqueSymbol: 'A', price: 0, lastUpdate: new Date() },
        { id: 1, name: 'Stock B', uniqueSymbol: 'B', price: 1, lastUpdate: new Date() }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StockListComponent,
                StockListItemComponent,
                StockEditComponent,
                TimeAgoPipe
            ],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                StockService,
                { provide: Router, useValue: { navigate: () => {} } }
            ]
        }).compileComponents();

        stockService = TestBed.get(StockService);
        router = TestBed.get(Router);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Initialization', () => {
        beforeEach(() => {
            spyOn(stockService, 'getAllStocks').and.returnValue(Observable.of(mockStocks));
        });

        it('loads stock list', () => {
            component.ngOnInit();
            expect(component.stocks).toEqual(mockStocks);
        });
    });

    /*
     * Normally, I would avoid testing private variables at any cost.
     * However, the only way to test the auto-refresh functionality's with public accessors only
     * is to add a lot of mock logic that is very hard to maintain (window object, view children).
     * Therefore, as an exception, I will use type casting to test this functionality.
     */
    describe('Stock auto refresh interval', () => {
        let loadStocksSpy: Spy;
        let getWindowPathnameSpy: Spy;
        let hasItemsInEditModeSpy: Spy;

        const autoRefreshCalled = (): boolean => {
            component.ngOnInit();
            // ngOnInit already calls loadStockSpy once.
            // For ease of testing, reset the calls count.
            loadStocksSpy.calls.reset();
            tick(15000);
            fixture.detectChanges();
            discardPeriodicTasks();
            return !!loadStocksSpy.calls.count();
        };

        beforeEach(() => {
            loadStocksSpy = spyOn(stockService, 'getAllStocks').and.callThrough();
            getWindowPathnameSpy = spyOn(<any>component, 'getWindowPathname').and.callThrough();
            hasItemsInEditModeSpy = spyOn(<any>component, 'hasItemsInEditMode').and.callThrough();

            // Set interval filter conditions to initially pass
            getWindowPathnameSpy.and.returnValue('/list');
            component.autoRefresh = true;
            hasItemsInEditModeSpy.and.returnValue(false);
        });

        it('loads stocks per fixed time interval if all conditions are met', fakeAsync(() => {
            expect(autoRefreshCalled()).toBeTruthy();
        }));

        it('does not load stocks if not in the stock list view', fakeAsync(() => {
            getWindowPathnameSpy.and.returnValue('/not-stock-list');
            expect(autoRefreshCalled()).toBeFalsy();
        }));

        it('does not load stocks if auto refresh mode is toggled off', fakeAsync(() => {
            component.autoRefresh = false;
            expect(autoRefreshCalled()).toBeFalsy();
        }));

        it('does not load stocks if there are stock items in edit mode', fakeAsync(() => {
            hasItemsInEditModeSpy.and.returnValue(true);
            expect(autoRefreshCalled()).toBeFalsy();
        }));
    });

    describe('goToCreateStock', () => {
        beforeEach(() => spyOn(router, 'navigate'));

        it('navigates to the "create" route', () => {
            component.goToCreateStock();
            expect(router.navigate).toHaveBeenCalledWith(['create']);
        });
    });

    describe('onAutoRefreshToggle', () => {
        it('sets component.autoRefresh on toggle change', () => {
            component.ngOnInit();
            expect(component.autoRefresh).toBeTruthy();
            component.onAutoRefreshToggle(false);
            expect(component.autoRefresh).toBeFalsy();
        });

        it('loads stocks if component.autoRefresh was toggled on (true)', () => {
            const spy = spyOn(stockService, 'getAllStocks').and.callThrough();

            component.ngOnInit();
            component.onAutoRefreshToggle(true);
            expect(spy).toHaveBeenCalled();

            spy.calls.reset();

            component.onAutoRefreshToggle(false);
            expect(spy).not.toHaveBeenCalled();
        });
    });
});
