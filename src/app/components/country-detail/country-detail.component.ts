import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../service/countries.service';
import { CountryItemComponent } from "../country-item/country-item.component";
import { PopulationPipe } from 'src/app/pipes/population.pipe';
import { MatIconModule } from '@angular/material/icon'
import { NavbarComponent } from "../navbar/navbar.component";
import { CountryQueryModel } from 'src/app/querymodels/country.queryModel';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css'],
  imports: [CommonModule, CountryItemComponent, RouterLink, PopulationPipe, MatIconModule, NavbarComponent]
})
export class CountryDetailComponent {

  readonly countryDetail$: Observable<CountryModel> = this._activatedRoute.params.pipe(
    switchMap((params => this._countriesService.getOne(params['name'])))
  )

  readonly CountryDetailWithBorders$: Observable<CountryQueryModel> = combineLatest([
    this.countryDetail$,
    this._countriesService.getAll()
  ]).pipe(
    map(([detail, countries]) => {
      const countryMap = countries.reduce((acc, curr) => {
        return { ...acc, [curr.alpha3Code]: curr }
      }, {} as Record<string, CountryModel>) //
      if (detail.borders) {
        return {
          ...detail,
          borders: detail.borders.map(alpha3Code => countryMap[alpha3Code].name)
        }
      } 
      else {
        return {
          ...detail,
        }
      }
    })
  )
  constructor(private _countriesService: CountriesService, private _activatedRoute: ActivatedRoute) {
  }
}
