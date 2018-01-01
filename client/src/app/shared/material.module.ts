import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
