import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsListComponent } from './professions-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProfessionsListComponent', () => {
  let component: ProfessionsListComponent;
  let fixture: ComponentFixture<ProfessionsListComponent>;

  let gnome;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionsListComponent);
    component = fixture.componentInstance;

    gnome = {
      id: 2,
      name: 'fakeName',
      age: 35,
      hair_color: 'pink',
      weight: 12,
      height: 15,
      thumbnail: 'fakethumb.jpg',
      friends: [],
      professions: []
    };

    component.gnome = gnome;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inhabitant has professions', () => {
    const professions = ['fake1', 'fake2', 'fake3'];
    beforeEach(() => {
      gnome.professions = professions;
      fixture.detectChanges();
    });
    it('Should show the list of professions', () => {
      const listOfProfessionsElement = fixture.debugElement.queryAll(By.css('#profession-value'));
      const professionsValues = listOfProfessionsElement.map(
        element => element.nativeElement.textContent
      );
      expect(professionsValues.length).not.toBe(0);
      for (const profession of professionsValues) {
        expect(professions).toContain(profession);
      }
    });
  });

  describe('Inhabitant does not have any profession', () => {
    beforeEach(() => {
      gnome.firends = [];
      fixture.detectChanges();
    }),
      it('Should show a message when inhabitant does not have professions', () => {
        const nopPofessionsMessageElement = fixture.debugElement.query(
          By.css('#no-professions-message')
        );

        expect(nopPofessionsMessageElement).not.toBeNull();
      });
    it('Should hide professions list when inhabitant does not have professions', () => {
      const professionsMessageElement = fixture.debugElement.query(By.css('#professions-list'));

      expect(professionsMessageElement).toBeNull();
    });
  });
});
