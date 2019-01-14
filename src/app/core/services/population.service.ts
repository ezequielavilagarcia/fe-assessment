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

  public gnomesInformation$: Observable<Gnome[]> = this.gnomesInformationSubject.asObservable();
  public gnomeSelected$: Observable<Gnome> = this.gnomeSelectedSubject.asObservable();

  constructor(@Inject(APP_CONFIG) constants: AppConfig, private http: HttpClient) {
    this.apiEndpoint = constants.apiEndpoint;
  }

  loadData() {
    if (this.populationDetail == null) {
      return this.http.get(this.apiEndpoint).pipe(
        tap((response: { Brastlewark: Gnome[] }) => {
          this.populationDetail = response.Brastlewark;
          this.gnomesInformationSubject.next(this.populationDetail);
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
