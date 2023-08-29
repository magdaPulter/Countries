import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private _httpClient: HttpClient) { 
  }

  getAll(): Observable<CountryModel[]> {
    return this._httpClient.get<CountryModel[]>('../assets/data.json').pipe(
      map((countries => countries.filter(country => country.capital)))
    )
  }
}
