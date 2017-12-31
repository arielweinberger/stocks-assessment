import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatGridListModule, MatIconModule,
    MatTableModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
