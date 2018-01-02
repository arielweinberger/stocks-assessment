import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from 'time-ago-pipe';

import { MaterialModule } from '../shared/material.module';
import { StockService } from './stock.service';
import { FeedbackService } from '../shared/feedback.service';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockListItemComponent } from './stock-list/stock-list-item/stock-list-item.component';
import { StockEditComponent } from './stock-list/stock-list-item/stock-edit/stock-edit.component';

const routes: Routes = [
    { path: 'list', component: StockListComponent },
    { path: 'create', component: StockCreateComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
    ],
    exports: [
        RouterModule,
        StockListComponent
    ],
    providers: [
        StockService,
        FeedbackService
    ],
    declarations: [
        TimeAgoPipe,
        StockListComponent,
        StockCreateComponent,
        StockListItemComponent,
        StockEditComponent
    ]
})
export class StocksModule {
}
