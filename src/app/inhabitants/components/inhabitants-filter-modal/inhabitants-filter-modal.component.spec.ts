import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantsFilterModalComponent } from './inhabitants-filter-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';

describe('InhabitantsFilterModalComponent', () => {
  let component: InhabitantsFilterModalComponent;
  let fixture: ComponentFixture<InhabitantsFilterModalComponent>;

  beforeEach(async(() => {
    class ModalControllerStub {
      dismiss() {}
    }
    TestBed.configureTestingModule({
      declarations: [InhabitantsFilterModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ModalController, useClass: ModalControllerStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhabitantsFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
