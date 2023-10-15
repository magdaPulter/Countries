import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Countries';

  private _isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isDark$: Observable<boolean> = this._isDarkSubject.asObservable().pipe(shareReplay(1));


  modeSelected(mode: boolean){
    this._isDarkSubject.next(mode)
  }


  @HostBinding('class')
  get themeMode(){
    return this._isDarkSubject.getValue() ? 'light-mode' :  'dark-mode' 
  }
}
