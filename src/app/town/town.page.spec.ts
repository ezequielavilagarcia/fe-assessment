import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownPage } from './town.page';
import { AuthService } from '../core/services/auth.service';
import { By } from '@angular/platform-browser';

describe('TownPage', () => {
  let component: TownPage;
  let fixture: ComponentFixture<TownPage>;

  beforeEach(async(() => {
    const AuthServiceStub = {
      user: { username: 'fakeName' }
    };
    TestBed.configureTestingModule({
      declarations: [TownPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AuthService, useValue: AuthServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show username', () => {
    const usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const authService = TestBed.get(AuthService);

    expect(usernameElement.textContent).toBe(authService.user.username);
  });
});
