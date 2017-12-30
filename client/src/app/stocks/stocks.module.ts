import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/Material.module';
import { StocksListComponent } from './stocks-list/stocks-list.component';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [
        StocksListComponent
    ],
    declarations: [
        StocksListComponent
    ]
})
export class StocksModule {}
