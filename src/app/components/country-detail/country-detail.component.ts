import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../service/countries.service';
import { CountryItemComponent } from "../country-item/country-item.component";
import { PopulationPipe } from 'src/app/pipes/population.pipe';
import {MatIconModule} from '@angular/material/icon'
import { NavbarComponent } from "../navbar/navbar.component";

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

  constructor(private _countriesService: CountriesService, private _activatedRoute: ActivatedRoute) {
  }
}
