import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of, noop } from 'rxjs';

import { PopulationService } from './population.service';
import { APP_CONFIG, AppConfig } from 'src/app/app.config';
import { Gnome } from 'src/app/shared/models/gnome';

describe('PopulationService', () => {
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
    const APP_CONFIGStub: AppConfig = {
      apiEndpoint: 'fakeApiEndpoint'
    };

    class HttpClientStub {
      get() {
        return of(inhabitantsList);
      }
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIGStub },
        { provide: HttpClient, useClass: HttpClientStub }
      ]
    });
  });

  it('should be created', () => {
    const service: PopulationService = TestBed.get(PopulationService);
    expect(service).toBeTruthy();
  });

  describe('#loadData', () => {

    it('should call http client get with correct url', () => {
      const service: PopulationService = TestBed.get(PopulationService);
      const appConfig: AppConfig = TestBed.get(APP_CONFIG);
      const http: Partial<HttpClient> = TestBed.get(HttpClient);
      const httpSpy = spyOn(http, 'get').and.callThrough();

      service.loadData();

      expect(httpSpy).toHaveBeenCalledWith(appConfig.apiEndpoint);
    });

    it('should do just one http request with multiples calls', () => {
      const service: PopulationService = TestBed.get(PopulationService);
      const http: Partial<HttpClient> = TestBed.get(HttpClient);
      const httpSpy = spyOn(http, 'get').and.callThrough();

      // Load data in memory
      service.loadData().subscribe(noop);
      // It doesn't have to call http method here
      service.loadData().subscribe(noop);

      expect(httpSpy).not.toHaveBeenCalledTimes(1);
    });

    it('should send the inhabitants list to gnomesInformation$ observable', () => {
      const fakeResponse: Partial<Gnome>[] = [{ id: 123 }];
      const service: PopulationService = TestBed.get(PopulationService);
      const http: Partial<HttpClient> = TestBed.get(HttpClient);
      spyOn(http, 'get').and.callFake(() => of({ Brastlewark: fakeResponse }));

      service.loadData().subscribe(noop);

      service.gnomesInformation$.subscribe(data => {
        expect(data[0].id).toBe(fakeResponse[0].id);
      });
    });
  });
});
