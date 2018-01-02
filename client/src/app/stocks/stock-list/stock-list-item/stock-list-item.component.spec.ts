import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListItemComponent } from './stock-list-item.component';
import { MaterialModule } from '../../../shared/material.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockListItemComponent', () => {
    let component: StockListItemComponent;
    let fixture: ComponentFixture<StockListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StockListItemComponent,
                StockEditComponent,
                TimeAgoPipe
            ],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockListItemComponent);
        component = fixture.componentInstance;

        component.stock = {
            id: 0,
            name: 'Mock Stock',
            uniqueSymbol: 'MKSTK',
            price: 0,
            lastUpdate: new Date()
        };

        fixture.detectChanges();
    });

    describe('toggleEdit', () => {
        it('toggles the state of component.edit', () => {
            component.edit = false;
            component.toggleEdit();
            expect(component.edit).toBeTruthy();
            component.toggleEdit();
            expect(component.edit).toBeFalsy();
        });
    });
});
