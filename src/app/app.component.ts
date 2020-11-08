import { Component } from '@angular/core';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'strategy-builder';
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) { 
    this.isLoggedIn = this.userService.isLoggedIn();
  }

}
