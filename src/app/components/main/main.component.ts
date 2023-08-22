import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryModel } from 'src/app/models/country.model';
import { CountriesService } from 'src/app/service/countries.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MainComponent {

  readonly countries$: Observable<CountryModel[]> = this._countriesService.getAll()


  constructor(private _countriesService: CountriesService) {}
}
