import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl = '/';

  constructor(public user: User) {}
  // store the URL so we can redirect after logging in

  login(user: User): void {
    this.user = user;
    this.isLoggedIn = true;
  }

  logout(redirectUrl = '/'): void {
    this.redirectUrl = redirectUrl;
    this.isLoggedIn = false;
  }

  saveUser() {

  }
}
