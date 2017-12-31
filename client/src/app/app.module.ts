import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MaterialModule } from './shared/material.module';
import { StocksModule } from './stocks/stocks.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    StocksModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
