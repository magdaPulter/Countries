import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryItemComponent } from './components/country-item/country-item.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MainComponent,
    CountryItemComponent,
    CountriesListComponent,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
