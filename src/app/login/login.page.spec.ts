import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    class AuthServiceStub {
      login(user: User) {}
      saveUser() {}
    }
    class RouterStub {
      navigate(route) {}
    }
    class UserStub {
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
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: User, useClass: UserStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {

  });

  it('should create', () => {});
});
