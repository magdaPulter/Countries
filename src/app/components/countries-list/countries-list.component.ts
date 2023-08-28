import { Component } from '@angular/core';
import { CountryModel } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/service/countries.service';
import { CountryItemComponent } from '../country-item/country-item.component';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
  standalone: true,
  imports: [CountryItemComponent, CommonModule,  MatIconModule, MatInputModule, ReactiveFormsModule]
})
export class CountriesListComponent {

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()

  readonly form: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  readonly searchedCountry$: Observable<CountryModel[]> = combineLatest([
    this.countries$,
    this.form.valueChanges.pipe(startWith({ search: '' }))
  ]).pipe(
    map(([countries, searchedForm]) => {
      return countries.filter(country => country.name.toLowerCase().includes(searchedForm.search.toLowerCase()))
    }))

  constructor(private _countriesService: CountriesService) {}
}
