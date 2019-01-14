import { Component, OnInit } from '@angular/core';
import { PopulationService } from '../core/services/population.service';

import { Observable } from 'rxjs';

import { Gnome } from '../shared/models/gnome';

@Component({
  selector: 'app-inhabitant-detail',
  templateUrl: './inhabitant-detail.page.html',
  styleUrls: ['./inhabitant-detail.page.scss']
})
export class InhabitantDetailPage implements OnInit {
  public gnomeSelected$: Observable<Gnome>;
  constructor(private populationService: PopulationService) {}

  ngOnInit() {
    this.gnomeSelected$ = this.populationService.gnomeSelected$;
  }
}
