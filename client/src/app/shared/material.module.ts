import { NgModule } from '@angular/core';
import {
    MatGridListModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatTableModule,
    MatGridListModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
