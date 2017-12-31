import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StocksListComponent } from './stocks-list/stocks-list.component';

@NgModule({
    imports: [
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        StocksListComponent
    ],
    declarations: [
        StocksListComponent
    ]
})
export class StocksModule {}
