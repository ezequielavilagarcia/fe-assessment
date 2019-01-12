import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantsPage } from './inhabitants.page';

describe('InhabitantsPage', () => {
  let component: InhabitantsPage;
  let fixture: ComponentFixture<InhabitantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InhabitantsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhabitantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
