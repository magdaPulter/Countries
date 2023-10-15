import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { BehaviorSubject, Observable, share, shareReplay, take, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class NavbarComponent {
  @Output() modeClicked: EventEmitter<boolean> = new EventEmitter<boolean>()

  private _isClickedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isClicked$: Observable<boolean> = this._isClickedSubject.asObservable().pipe(shareReplay(1));

  onModeClick(){
    this.isClicked$.pipe(
      take(1),
      tap(isClicked => {
        this._isClickedSubject.next(!isClicked),
        this.modeClicked.emit(isClicked)
      })
    ).subscribe()
   
  }
}
