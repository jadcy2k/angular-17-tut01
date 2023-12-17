import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userName:string = 'James Hetfield';
  isLogged:boolean = true;
  greetUser = () => {
    alert ('Hola!!');
  }
}
