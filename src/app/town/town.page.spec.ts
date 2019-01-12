import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownPage } from './town.page';

describe('TownPage', () => {
  let component: TownPage;
  let fixture: ComponentFixture<TownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TownPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
});
