import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-town',
  templateUrl: 'town.page.html',
  styleUrls: ['town.page.scss']
})
export class TownPage {
  private username: string;
  constructor(private authService: AuthService) {
    this.username = this.authService.user.username;
  }
}
