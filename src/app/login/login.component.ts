import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.userService.login();
  }

  onSubmit() {
    this.userService.login();
  }
}
