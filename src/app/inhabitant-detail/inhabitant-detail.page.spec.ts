import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantDetailPage } from './inhabitant-detail.page';
import { PopulationService } from '../core/services/population.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Gnome } from '../shared/models/gnome';

describe('InhabitantDetailPage', () => {
  let component: InhabitantDetailPage;
  let fixture: ComponentFixture<InhabitantDetailPage>;

  beforeEach(() => {
    class PopulationServiceStub {
      private gnomeSelectedSubject = new BehaviorSubject(null);
      public gnomeSelected$ = this.gnomeSelectedSubject.asObservable();
      setGnomeSelected(gnome) {
        this.gnomeSelectedSubject.next(gnome);
      }
    }
    TestBed.configureTestingModule({
      declarations: [InhabitantDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: PopulationService, useClass: PopulationServiceStub }]
    }).compileComponents();
    fixture = TestBed.createComponent(InhabitantDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Should show inhabitant detail when is one selected', () => {
    let gnome: Partial<Gnome>;
    beforeEach(() => {
      const populationService = TestBed.get(PopulationService);
      gnome = {
        id: 2,
        name: 'fakeName',
        age: 35,
        hair_color: 'pink',
        weight: 12,
        height: 15,
        thumbnail: 'fakethumb.jpg'
      };
      populationService.setGnomeSelected(gnome);
      fixture.detectChanges();
    });
    it('Should show inhabitant detail', () => {
      const gnomeNameFromView = fixture.debugElement.query(By.css('#gnome-name'));
      const gnomeAgeFromView = fixture.debugElement.query(By.css('#gnome-age'));
      const gnomeHairColorFromView = fixture.debugElement.query(By.css('#gnome-hair-color'));
      const gnomeWeightFromView = fixture.debugElement.query(By.css('#gnome-weight'));
      const gnomeHeightFromView = fixture.debugElement.query(By.css('#gnome-height'));
      const gnomeThumbnailFromView = fixture.debugElement.query(By.css('#gnome-thumbnail'));

      expect(gnomeNameFromView.nativeElement.textContent).toBe(gnome.name);
      expect(+gnomeAgeFromView.nativeElement.textContent).toBe(gnome.age);
      expect(gnomeHairColorFromView.styles['background-color']).toBe(gnome.hair_color);
      expect(+gnomeWeightFromView.nativeElement.textContent).toBe(gnome.weight);
      expect(+gnomeHeightFromView.nativeElement.textContent).toBe(gnome.height);
      expect(gnomeThumbnailFromView.properties['src']).toBe(gnome.thumbnail);
    });

    it('Should include professions-list component', () => {
      const professionsListTag = fixture.debugElement.query(By.css('app-professions-list'));

      expect(professionsListTag).not.toBeNull();
    });

    it('Should include friends-list component', () => {
      const friendsListTag = fixture.debugElement.query(By.css('app-friends-list'));

      expect(friendsListTag).not.toBeNull();
    });

    it('Should hide No Gnome is selected message', () => {
      const noGnomeMessageElement = fixture.debugElement.query(By.css('#no-gnome-message'));

      expect(noGnomeMessageElement).toBeNull();
    });
  });
  it('Should show a message if an inhabitant is not selected', () => {
    const noGnomeMessageElement = fixture.debugElement.query(By.css('#no-gnome-message'));
    const showGnomeElement = fixture.debugElement.query(By.css('#show-gnome'));

    expect(noGnomeMessageElement).not.toBeNull();
    expect(showGnomeElement).toBeNull();
  });

  it('Back arrow should return to inhabitants list page', () => {
    const backArrowElement = fixture.debugElement.query(By.css('.back-arrow'));

    expect(backArrowElement.properties.routerLink).toContain('/tabs/inhabitants-list');
  });
});
