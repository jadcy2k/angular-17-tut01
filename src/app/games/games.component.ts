import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  template: `
    <ul>
      @for (os of operatingSystems; track os.id) {
        <li (click)="sayOS(os.name)">{{os.name}}</li>
      }
    </ul>
  `,
  styles: `
    li {
      cursor:pointer; margin:0.5rem 0; padding: 0.5rem;
      border:1px solid blue; background: blue;
      list-style: none;
    }
  `
})
export class GamesComponent {
  operatingSystems = [
    { id: 'win', name: 'Windows' }, 
    { id: 'osx', name: 'MacOS' }, 
    { id: 'linux', name: 'Linux' },
    { id: 'android', name: 'Android' }
  ];

  // Output:
  @Output() sayOsEvent = new EventEmitter<string>();

  sayOS(operatingSystem: string) {
    this.sayOsEvent.emit(operatingSystem);
  }
}
