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
}
