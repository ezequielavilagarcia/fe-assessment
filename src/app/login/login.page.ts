import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [User]
})
export class LoginPage implements OnInit {
  rememberMe = false;
  constructor(private authService: AuthService, private router: Router, public user: User) {}

  ngOnInit() {}

  login() {
    // Redirect the user
    this.authService.login(this.user);
    this.router.navigate([this.authService.redirectUrl]);
  }
}
