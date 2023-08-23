import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { CountryModel } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.css'], 
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class CountryItemComponent {
  @Input() country!: CountryModel
}
