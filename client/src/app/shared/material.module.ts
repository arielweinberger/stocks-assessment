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
    MatChipsModule,
    MatSlideToggleModule
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
    MatChipsModule,
    MatSlideToggleModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {
}
