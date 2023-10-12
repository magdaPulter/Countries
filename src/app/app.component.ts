import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Countries';

  isDark = false 

  @HostBinding('class')
  get themeMode(){
    return this.isDark ? 'dark-mode' : 'light-mode'
  }
}
