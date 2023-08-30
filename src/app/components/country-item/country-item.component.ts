import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { CountryModel } from 'src/app/models/country.model';
import { PopulationPipe } from 'src/app/pipes/population.pipe';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.css'], 
  standalone: true,
  imports: [CommonModule, MatCardModule, PopulationPipe]
})
export class CountryItemComponent {
  @Input() country!: CountryModel
}
