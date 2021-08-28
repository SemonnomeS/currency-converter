import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './spinners/loading-spinner/loading-spinner.component';

import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ConverterComponent } from './components/converter/converter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListCurrenciesComponent } from './components/list-currencies/list-currencies.component';

registerLocaleData(en);

declare global {
  interface Window {
    $SP: Function;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    ConverterComponent,
    NavbarComponent,
    ListCurrenciesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
