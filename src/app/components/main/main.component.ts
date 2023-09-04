import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CountriesListComponent } from '../countries-list/countries-list.component';
import { CountriesService } from '../../service/countries.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, CountriesListComponent]
})
export class MainComponent {
}
