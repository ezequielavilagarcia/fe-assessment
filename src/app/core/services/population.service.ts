import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG, AppConfig } from 'src/app/app.config';
import { map, catchError } from 'rxjs/operators';
import { Gnome } from 'src/app/shared/models/gnome';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FilterData } from 'src/app/inhabitants/models/filtar-data';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {
  private populationDetail: Gnome[];
  private apiEndpoint: string;

  private gnomesInformationSubject: BehaviorSubject<Gnome[]>;
  private gnomeSelectedSubject: BehaviorSubject<Gnome>;
  private professionsSubject: BehaviorSubject<string[]>;
  private hairColorsSubject: BehaviorSubject<string[]>;
  private filtersAppliedSubject: BehaviorSubject<string[]>;

  public gnomesInformation$: Observable<Gnome[]>;
  public gnomeSelected$: Observable<Gnome>;
  public professions$: Observable<string[]>;
  public hairColors$: Observable<string[]>;
  public filtersApplied$: Observable<string[]>;

  constructor(
    @Inject(APP_CONFIG) constants: AppConfig,
    private http: HttpClient,
    private filterData: FilterData
  ) {
    this.apiEndpoint = constants.apiEndpoint;

    this.gnomesInformationSubject = new BehaviorSubject([]);
    this.gnomesInformation$ = this.gnomesInformationSubject.asObservable();

    this.gnomeSelectedSubject = new BehaviorSubject(null);
    this.gnomeSelected$ = this.gnomeSelectedSubject.asObservable();

    this.hairColorsSubject = new BehaviorSubject([]);
    this.hairColors$ = this.hairColorsSubject.asObservable();

    this.professionsSubject = new BehaviorSubject([]);
    this.professions$ = this.professionsSubject.asObservable();

    this.filtersAppliedSubject = new BehaviorSubject(this.filterData.filtersApplied);
    this.filtersApplied$ = this.filtersAppliedSubject.asObservable();
  }

  /**
   * Load inhabitants data and also prepare professions and hair colors to be used in filters.
   * It sort and trim all the professions and hair colors
   * @returns
   * @memberof PopulationService
   */
  loadData() {
    if (this.populationDetail == null) {
      return this.http.get(this.apiEndpoint).pipe(
        catchError(err => {
          return of({ Brastlewark: [] });
        }),
        map((response: { Brastlewark: Gnome[] }) => {
          this.populationDetail = response.Brastlewark;
          const professions = new Set();
          const hairColors = new Set();

          for (const gnome of this.populationDetail) {
            for (const profession of gnome.professions) {
              professions.add(profession.trim());
            }
            hairColors.add(gnome.hair_color.trim());
          }
          const sortedProfessions = Array.from(professions).sort();
          const sortedHairColors = Array.from(hairColors).sort();

          this.gnomesInformationSubject.next(this.populationDetail);
          this.professionsSubject.next(sortedProfessions);
          this.hairColorsSubject.next(sortedHairColors);

          return null;
        })
      );
    } else {
      return of(null);
    }
  }

  /**
   * This is used to not search in all the data which gnome was selected, it is managed with rxjs
   * When a gnome from inhabitants list is selected, a new value is emitted, and it is reached in any place where is need it.
   *
   * @param {Gnome} gnome
   * @memberof PopulationService
   */
  setGnomeSelected(gnome: Gnome) {
    this.gnomeSelectedSubject.next(gnome);
  }

  get filter(): FilterData {
    return JSON.parse(JSON.stringify(this.filterData));
  }

  filterDataset(filter: FilterData) {
    this.filterData.copyFilters(filter);
    const futureDataset = this.filterData.executeAllStrategies(this.populationDetail);

    this.gnomesInformationSubject.next(futureDataset);
    this.filtersAppliedSubject.next(this.filterData.filtersApplied);
  }
}
