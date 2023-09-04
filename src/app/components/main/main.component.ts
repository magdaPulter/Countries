import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountryDetailComponent } from '../country-detail/country-detail.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, CountriesListComponent, CountryDetailComponent]
})
export class MainComponent {
}
