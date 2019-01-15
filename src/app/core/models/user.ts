import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  username: string;
  dateOfBirth: Date;
  race: string;
  gender: string;

  constructor() {
    this.username = '';
    this.dateOfBirth = null;
    this.race = null;
    this.gender = null;
  }

  copy(user: User) {
    this.username = user.username;
    this.dateOfBirth = user.dateOfBirth;
    this.race = user.race;
    this.gender = user.gender;
  }

  reset() {
    this.username = '';
    this.dateOfBirth = null;
    this.race = null;
    this.gender = null;
  }
}
