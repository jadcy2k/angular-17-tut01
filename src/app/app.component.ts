import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";
import { GamesComponent } from "./games/games.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, UserComponent, GamesComponent]
})
export class AppComponent {
  title:string = 'My new app in Angular 17';
  city:string = 'Barcelona';

  // Propiedad dinámica:
  selectedOS = '';
  // Metodo para manipular esa propiedad dinámica:
  getSelectedOS = (os:string) => {
    this.selectedOS = os;
  }
}
