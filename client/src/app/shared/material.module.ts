import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatFormFieldModule,
    MatGridListModule, MatIconModule, MatInputModule,
    MatTableModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
