import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, Observable, combineLatest, map, shareReplay, startWith, take, tap, switchMap } from 'rxjs';
import { CountryItemComponent } from '../country-item/country-item.component';
import { SelectCategoryDirective } from '../../directives/select-category.directive';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../service/countries.service';
import { FiltersComponent } from "../filters/filters.component";
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-countries-list',
    templateUrl: './countries-list.component.html',
    styleUrls: ['./countries-list.component.css'],
    standalone: true,
    imports: [CountryItemComponent, CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule, SelectCategoryDirective, FiltersComponent, RouterModule, NavbarComponent]
})
export class CountriesListComponent {

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()
    .pipe(shareReplay(1))

  readonly form: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  private _filteredRegionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filteredRegion$: Observable<string> = this._filteredRegionSubject.asObservable();

  readonly selectedRegionFromQueryParams$: Observable<string> = this._activatedRoute.queryParams.pipe(
    map((queryParams) => {
      return queryParams['region']
    })
  )

  readonly searchedCountry$: Observable<CountryModel[]> = combineLatest([
    this.countries$,
    this.form.valueChanges.pipe(startWith({ search: '' })),
    this.selectedRegionFromQueryParams$
  ]).pipe(
    map(([countries, searchedForm, filteredRegion]) => {
      if (filteredRegion === undefined && searchedForm.search === '' ) {
        return countries
      } else {
        return countries
          .filter(country => searchedForm.search !== '' ? country.name.toLowerCase().includes(searchedForm.search.toLowerCase()) : true)
          .filter(country => filteredRegion !== undefined ? country.region === filteredRegion : true)
      }
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

  constructor(private _countriesService: CountriesService, private _router: Router, private _activatedRoute: ActivatedRoute) {}


  regionSelected(region: string) {
    this._router.navigate(
      [],
      { queryParams: { region: region } }
      )
  }
}
