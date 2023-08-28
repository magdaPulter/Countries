import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subject, combineLatest, map, shareReplay, startWith, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CountryItemComponent } from '../country-item/country-item.component';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../service/countries.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
  standalone: true,
  imports: [CountryItemComponent, CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule]
})
export class CountriesListComponent {

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()
    .pipe(shareReplay(1))

  readonly form: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  private _filteredRegionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filteredRegion$: Observable<string> = this._filteredRegionSubject.asObservable();

  readonly searchedCountry$: Observable<CountryModel[]> = combineLatest([
    this.countries$,
    this.form.valueChanges.pipe(startWith({ search: '' })),
    this.filteredRegion$
  ]).pipe(
    map(([countries, searchedForm, filteredRegion]) => {
      if(filteredRegion === '') {
        return countries
      } 
      return countries
      .filter(country => country.name.toLowerCase().includes(searchedForm.search.toLowerCase()))
      .filter(country => country.region === filteredRegion)
    }))

  readonly region$: Observable<string[]> = this.countries$
    .pipe(
      map(countries => countries.map(country => country.region)),
      map(region => this._removeDuplicates(region))
    )
 
  private _removeDuplicates(array: string[]) {
    const region = array.reduce((acc: string[], curr: string) => {
      if (!acc.includes(curr))
        acc.push(curr)
      return acc
    }, [])
    return region
  }

  constructor(private _countriesService: CountriesService) { }

  onRegionClicked(region: string) {
    this._filteredRegionSubject.next(region)
  }

}
