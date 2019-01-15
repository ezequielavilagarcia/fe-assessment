import { Injectable, Inject } from '@angular/core';

import { Storage } from '@ionic/storage';

import { User } from 'src/app/core/models/user';
import { APP_CONFIG, AppConfig } from 'src/app/app.config';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl = '/';
  private userDBKey: string;
  constructor(
    public user: User,
    private storage: Storage,
    @Inject(APP_CONFIG) constants: AppConfig
  ) {
    this.userDBKey = constants.userDBKey;
  }

  login(user: User): void {
    this.user.copy(user);
    this.isLoggedIn = true;
  }

  logout(redirectUrl = '/'): void {
    this.redirectUrl = redirectUrl;
    this.isLoggedIn = false;
  }

  async rememberUser() {
    await this.storage.set(this.userDBKey, JSON.stringify(this.user));
  }

  async forgetUser() {
    await this.storage.remove(this.userDBKey);
  }

  checkLogin(): Observable<boolean> {
    if (this.isLoggedIn) {
      return of(this.isLoggedIn);
    }

    return from(this.storage.get(this.userDBKey)).pipe(
      map(userJson => {
        let isLogged = false;
        if (userJson != null) {
          isLogged = true;
          this.user.copy(JSON.parse(userJson));
        }
        return isLogged;
      })
    );
  }
}
