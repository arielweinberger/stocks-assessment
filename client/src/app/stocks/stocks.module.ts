import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockService } from './stock.service';

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
        HttpClientModule
    ],
    exports: [
        RouterModule,
        StockListComponent
    ],
    providers: [
        StockService
    ],
    declarations: [
        StockListComponent,
        StockCreateComponent
    ]
})
export class StocksModule {
}
