import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryModel } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/service/countries.service';
import { CountryItemComponent } from '../country-item/country-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
  standalone: true,
  imports: [CountryItemComponent, CommonModule]
})
export class CountriesListComponent {

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()


  constructor(private _countriesService: CountriesService) {}
}
