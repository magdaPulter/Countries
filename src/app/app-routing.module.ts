import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [{ path: '', component: MainComponent}, {path: 'country/:name', component: CountryDetailComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
