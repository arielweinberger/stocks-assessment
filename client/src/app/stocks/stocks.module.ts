import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockCreateComponent } from './stock-create/stock-create.component';

const routes: Routes = [
    { path: '', component: StockListComponent },
    { path: 'create', component: StockCreateComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        RouterModule,
        StockListComponent
    ],
    declarations: [
        StockListComponent,
        StockCreateComponent
    ]
})
export class StocksModule {}
