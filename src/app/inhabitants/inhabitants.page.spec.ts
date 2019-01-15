import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ModalController } from '@ionic/angular';

import { of, BehaviorSubject } from 'rxjs';

import { InhabitantsPage } from './inhabitants.page';
import { PopulationService } from '../core/services/population.service';
import { Gnome } from '../shared/models/gnome';

describe('InhabitantsPage', () => {
  let component: InhabitantsPage;
  let fixture: ComponentFixture<InhabitantsPage>;
  const inhabitantsList: Gnome[] = [
    {
      id: 0,
      name: 'Fake 0',
      thumbnail: 'fake-thumbnail.jpg',
      professions: ['prof1', 'prof2'],
      age: 30,
      height: 12,
      weight: 12,
      friends: [],
      hair_color: 'blue'
    },
    {
      id: 1,
      name: 'Fake 1',
      thumbnail: 'fake-thumbnail.jpg',
      professions: ['prof1', 'prof2'],
      age: 20,
      height: 11,
      weight: 11,
      friends: [],
      hair_color: 'pink'
    },
    {
      id: 2,
      name: 'Fake 2',
      thumbnail: 'fake-thumbnail.jpg',
      professions: ['prof1', 'prof2'],
      age: 10,
      height: 10,
      weight: 10,
      friends: [],
      hair_color: 'red'
    }
  ];

  beforeEach(() => {
    class PopulationServiceStub {
      private gnomesInformationSubject = new BehaviorSubject([]);
      public gnomesInformation$ = this.gnomesInformationSubject.asObservable();

      loadData() {
        this.gnomesInformationSubject.next(inhabitantsList);
        return of(null);
      }

      setGnomeSelected() {}

      filterDataset(dataset) {}

      get filter() {
        return { name: '' };
      }
    }

    class RouterStub {
      navigate(valueToNavigate: []) {}
    }

    class ModalControllerStub {
      create(object) {
        return of({ present: () => of(null) });
      }
    }

    TestBed.configureTestingModule({
      declarations: [InhabitantsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopulationService, useClass: PopulationServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ModalController, useClass: ModalControllerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InhabitantsPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should subscribe to load data on init', () => {
    const populationService = TestBed.get(PopulationService);
    const spy = spyOn(populationService, 'loadData').and.callThrough();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should show a list of inhabitants', () => {
    fixture.detectChanges();

    const virtualScrollItems = fixture.debugElement.query(By.css('.inhabitants-list')).properties
      .items;
    let index = 0;
    for (const item of virtualScrollItems) {
      expect(item.id).toBe(inhabitantsList[index++].id);
    }
  });

  it('should redirect to detail page on click', () => {
    // Up to now 01/13/2019, virtualscroll can't be affected by fixture.detectChanges so i can't simulate click on ion-item
    // It is not rendered. I could use ion-list instead of ion-virtual-scroll but I think that in this case it's better to prioritize the
    // performance given by ion-virtual-scroll.
    fixture.detectChanges();
    const gnome = inhabitantsList[0];
    const populationService = TestBed.get(PopulationService);
    const router = TestBed.get(Router);

    spyOn(populationService, 'setGnomeSelected').and.callThrough();
    const spyRouter = spyOn(router, 'navigate').and.callThrough();
    component.goToGnomeDetail(gnome);
    expect(spyRouter).toHaveBeenCalledWith(['/inhabitant-detail', gnome.id]);
  });

  it('should call filterDataset from populationService with correct filter name value', () => {
    const $event = {
      target: { value: 'fake-text' }
    };
    const populationService = TestBed.get(PopulationService);
    const filterDatasetSpy = spyOn(populationService, 'filterDataset');

    component.searchByName($event);

    expect(filterDatasetSpy).toHaveBeenCalledWith({ name: 'fake-text' });
  });
});
