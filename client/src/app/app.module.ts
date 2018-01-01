import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MaterialModule } from './shared/material.module';
import { StocksModule } from './stocks/stocks.module';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        StocksModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
