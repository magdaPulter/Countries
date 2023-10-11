import { AfterViewInit, Component } from '@angular/core';
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
export class CountriesListComponent implements AfterViewInit{

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()
    .pipe(
      shareReplay(1)
    )

  readonly form: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  private _searchValuesSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchValues$: Observable<string> = this._searchValuesSubject.asObservable();


  readonly searchValuesQueryParams$: Observable<Params> = this._activatedRoute.queryParams
  .pipe(
    shareReplay(1)
  )

  readonly searchedCountry$: Observable<CountryModel[]> = combineLatest([
    this.countries$,
    this.searchValuesQueryParams$
  ]).pipe(
    map(([countries, searchValues]) => {
      if (searchValues['region'] === undefined && searchValues['search'] === undefined ) {
        return countries
      } else {
        return countries
          .filter(country => searchValues['search'] !== undefined ? country.name.toLowerCase().includes(searchValues['search'].toLowerCase()) : true)
          .filter(country => searchValues['region'] !== undefined ? country.region === searchValues['region'] : true)
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

  ngAfterViewInit(): void {
    this.form.get('search')?.valueChanges.pipe(
      tap(searchValue => 
        this._router.navigate(
        [],
        { queryParams: { search: searchValue } , queryParamsHandling: 'merge' }
        ))
    ).subscribe()

    this.searchValues$.pipe(
      tap(searchValue => {
        this.form.controls['search']?.patchValue(searchValue['search'])
      })
    ).subscribe()
  }

  regionSelected(region: string) {
    this._router.navigate(
      [],
      { queryParams: { region: region } , queryParamsHandling: 'merge' }
      )
  }
}
