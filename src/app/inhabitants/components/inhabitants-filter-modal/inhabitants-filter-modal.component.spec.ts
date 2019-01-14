import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantsFilterModalComponent } from './inhabitants-filter-modal.component';

describe('InhabitantsFilterModalComponent', () => {
  let component: InhabitantsFilterModalComponent;
  let fixture: ComponentFixture<InhabitantsFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhabitantsFilterModalComponent ]
    })
    .compileComponents();
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
