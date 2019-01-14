import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APP_CONFIG, AppConfig } from 'src/app/app.config';
import { tap, map } from 'rxjs/operators';
import { Gnome } from 'src/app/shared/models/gnome';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {
  private populationDetail: Gnome[];
  private apiEndpoint: string;

  private gnomesInformationSubject = new BehaviorSubject([]);
  private gnomeSelectedSubject = new BehaviorSubject(null);
  private professionsSubject = new BehaviorSubject([]);
  private hairColorsSubject = new BehaviorSubject([]);

  public gnomesInformation$: Observable<Gnome[]> = this.gnomesInformationSubject.asObservable();
  public gnomeSelected$: Observable<Gnome> = this.gnomeSelectedSubject.asObservable();
  public professions$: Observable<string[]> = this.professionsSubject.asObservable();
  public hairColors$: Observable<string[]> = this.hairColorsSubject.asObservable();

  constructor(@Inject(APP_CONFIG) constants: AppConfig, private http: HttpClient) {
    this.apiEndpoint = constants.apiEndpoint;
  }

  loadData() {
    if (this.populationDetail == null) {
      return this.http.get(this.apiEndpoint).pipe(
        tap((response: { Brastlewark: Gnome[] }) => {
          this.populationDetail = response.Brastlewark;
          const professions = new Set();
          const hairColors = new Set();

          for (const gnome of this.populationDetail) {
            professions.add(gnome.professions);
            hairColors.add(gnome.hair_color);
          }

          this.gnomesInformationSubject.next(this.populationDetail);
          this.professionsSubject.next(Array.from(professions));
          this.hairColorsSubject.next(Array.from(hairColors));
        })
      );
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
}
