import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Input() form!: FormGroup 
  @Input() regions!: string[]
  @Output() regionClicked: EventEmitter<string> = new EventEmitter<string>()

  private _isClickedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isClicked$: Observable<boolean> = this._isClickedSubject.asObservable();

  onFilterClicked() {
    this.isClicked$.pipe(
      take(1),
      tap(isClicked => {
        this._isClickedSubject.next(!isClicked)
      })
    ).subscribe()
  }

  onRegionClicked(region: string) {
    this.regionClicked.emit(region)
  }
}
