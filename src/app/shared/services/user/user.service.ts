import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this._isLoggedIn = false;
   }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login() {
    this._isLoggedIn = true;
  }

  logout() {
    this._isLoggedIn = false;
  }
}
