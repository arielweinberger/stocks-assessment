import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatChipsModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatChipsModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
