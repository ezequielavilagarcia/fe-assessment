import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../core/models/user';

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

    if (this.rememberMe) {
      this.authService.rememberUser();
    } else {
      this.authService.forgetUser();
    }

    this.router.navigate([this.authService.redirectUrl]);

    this.resetForm();
  }

  /**
   * Reset form for future access
   *
   * @memberof LoginPage
   */
  resetForm() {
    this.user.reset();
  }
}
