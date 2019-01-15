import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterPage } from './my-character.page';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';

describe('MyCharacterPage', () => {
  let component: MyCharacterPage;
  let fixture: ComponentFixture<MyCharacterPage>;

  beforeEach(async(() => {
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
    class AuthServiceStub {
      user: User = new UserStub();
      logout() {}
    }
    class RouterStub {
      navigate(route) {}
    }
    TestBed.configureTestingModule({
      declarations: [MyCharacterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
