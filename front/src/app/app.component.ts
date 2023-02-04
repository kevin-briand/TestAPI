import { Component } from '@angular/core';
import {UsersService} from "./service/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';


  constructor(public usersService: UsersService) {
  }
}
