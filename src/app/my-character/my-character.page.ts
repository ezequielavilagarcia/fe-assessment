import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-my-character',
  templateUrl: 'my-character.page.html',
  styleUrls: ['my-character.page.scss']
})
export class MyCharacterPage {
  user: User;
  userImgPath: string;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
    this.userImgPath = `/assets/${this.user.race}-${this.user.gender}.jpg`;
  }
  logout() {
    this.authService.logout('/tabs/my-character');

    this.router.navigate(['/login']);
  }
}
