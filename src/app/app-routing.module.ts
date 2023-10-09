import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';

const routes: Routes = [{ path: '', component: CountriesListComponent}, {path: 'country/:name', component: CountryDetailComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
