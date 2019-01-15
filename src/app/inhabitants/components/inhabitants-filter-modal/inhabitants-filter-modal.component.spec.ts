import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

import { InhabitantsFilterModalComponent } from './inhabitants-filter-modal.component';
import { PopulationService } from 'src/app/core/services/population.service';
import { FilterData } from '../../models/filtar-data';
import { INHABITANTS_CONFIG, InhabitantsConfig } from '../../inhabitants.config';
import { By } from '@angular/platform-browser';

describe('InhabitantsFilterModalComponent', () => {
  let component: InhabitantsFilterModalComponent;
  let fixture: ComponentFixture<InhabitantsFilterModalComponent>;

  beforeEach(async(() => {
    class ModalControllerStub {
      dismiss() {}
    }

    const inhabitantsConfigStub: InhabitantsConfig = {
      minAgeRange: 0,
      maxAgeRange: 500,
      ageStep: 10,
      minWeightRange: 20,
      maxWeightRange: 60,
      weightStep: 1,
      minHeightRange: 0,
      maxHeightRange: 300,
      heightStep: 10,
      nameFilterName: 'Name',
      sortingFilterAscName: 'Name asc',
      sortingFilterDescName: 'Name desc',
      ageFilterName: 'Age',
      weightFilterName: 'Weight',
      heightFilterName: 'Height',
      hairColorFilterName: 'Hair',
      professionFilterName: 'Professions'
    };

    class PopulationServiceStub {
      hairColors$ = of(['color1', 'color2']);
      professions$ = of(['profession1', 'profession2']);
      filter: FilterData = new FilterData(inhabitantsConfigStub);
      filterDataset(filter) {}
    }

    TestBed.configureTestingModule({
      declarations: [InhabitantsFilterModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useClass: ModalControllerStub },
        { provide: PopulationService, useClass: PopulationServiceStub },
        { provide: INHABITANTS_CONFIG, useValue: inhabitantsConfigStub }
      ]
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

  it('should call filterDataset on click on apply-label and then close the modal', () => {
    const applyElement = fixture.debugElement.query(By.css('#apply-label')).nativeElement;
    const populationService = TestBed.get(PopulationService);
    const modalController = TestBed.get(ModalController);

    const populationServiceSpy = spyOn(populationService, 'filterDataset');
    const modalControllerSpy = spyOn(modalController, 'dismiss');

    applyElement.click();

    expect(populationServiceSpy).toHaveBeenCalledWith(component.filter);
    expect(modalControllerSpy).toHaveBeenCalled();
  });

  it('should control correctly sync between sorting asc and desc buttons', async () => {
    component.changeSortingAsc(true);

    expect(component.filter.sorting.asc).toBe(true);
    expect(component.filter.sorting.desc).not.toBeTruthy();

    component.changeSortingDesc(true);

    expect(component.filter.sorting.desc).toBeTruthy();
    expect(component.filter.sorting.asc).not.toBeTruthy();
  });

  it('should have correctly binding all age properties', async () => {
    const ageElement = fixture.debugElement.query(By.css('#age-range-value'));
    const inhabitantsConstants = TestBed.get(INHABITANTS_CONFIG);

    expect(inhabitantsConstants.minAgeRange).toBe(ageElement.properties.min);
    expect(inhabitantsConstants.maxAgeRange).toBe(ageElement.properties.max);
    expect(inhabitantsConstants.ageStep).toBe(ageElement.properties.step);

    component.filter.ageRange.lower = 100;
    component.filter.ageRange.upper = 200;

    fixture.detectChanges();

    expect(ageElement.properties.ngModel.lower).toBe(100);
    expect(ageElement.properties.ngModel.upper).toBe(200);
  });

  it('should have correctly binding all height properties', async () => {
    const heightElement = fixture.debugElement.query(By.css('#height-range-value'));
    const inhabitantsConstants = TestBed.get(INHABITANTS_CONFIG);

    expect(inhabitantsConstants.minHeightRange).toBe(heightElement.properties.min);
    expect(inhabitantsConstants.maxHeightRange).toBe(heightElement.properties.max);
    expect(inhabitantsConstants.heightStep).toBe(heightElement.properties.step);

    component.filter.heightRange.lower = 40;
    component.filter.heightRange.upper = 80;

    fixture.detectChanges();

    expect(heightElement.properties.ngModel.lower).toBe(40);
    expect(heightElement.properties.ngModel.upper).toBe(80);
  });

  it('should have correctly binding all weight properties', async () => {
    const weightElement = fixture.debugElement.query(By.css('#weight-range-value'));
    const inhabitantsConstants = TestBed.get(INHABITANTS_CONFIG);

    expect(inhabitantsConstants.minWeightRange).toBe(weightElement.properties.min);
    expect(inhabitantsConstants.maxWeightRange).toBe(weightElement.properties.max);
    expect(inhabitantsConstants.weightStep).toBe(weightElement.properties.step);

    component.filter.weightRange.lower = 50;
    component.filter.weightRange.upper = 100;

    fixture.detectChanges();

    expect(weightElement.properties.ngModel.lower).toBe(50);
    expect(weightElement.properties.ngModel.upper).toBe(100);
  });
});
