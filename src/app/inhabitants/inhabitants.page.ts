import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, noop } from 'rxjs';

import { Gnome } from '../shared/models/gnome';
import { PopulationService } from '../core/services/population.service';

@Component({
  selector: 'app-inhabitants',
  templateUrl: 'inhabitants.page.html',
  styleUrls: ['inhabitants.page.scss']
})
export class InhabitantsPage implements OnInit {
  gnomeInformation$: Observable<Gnome[]>;
  constructor(private populationService: PopulationService, private router: Router) {
    this.gnomeInformation$ = this.populationService.gnomesInformation$;
  }

  ngOnInit() {
    this.populationService.loadData().subscribe(noop);
  }
  goToGnomeDetail(gnome: Gnome) {
    this.populationService.setGnomeSelected(gnome);

    this.router.navigate(['/inhabitant-detail', gnome.id]);
  }
}
