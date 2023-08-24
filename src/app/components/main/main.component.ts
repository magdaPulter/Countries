import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountriesListComponent } from '../countries-list/countries-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, CountriesListComponent]
})
export class MainComponent {


}
