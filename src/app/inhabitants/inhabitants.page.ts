import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, noop } from 'rxjs';

import { Gnome } from '../shared/models/gnome';
import { PopulationService } from '../core/services/population.service';
import { ModalController } from '@ionic/angular';
import { InhabitantsFilterModalComponent } from './components/inhabitants-filter-modal/inhabitants-filter-modal.component';

@Component({
  selector: 'app-inhabitants',
  templateUrl: 'inhabitants.page.html',
  styleUrls: ['inhabitants.page.scss']
})
export class InhabitantsPage implements OnInit {
  gnomesInformation$: Observable<Gnome[]>;
  filtersApplied$: Observable<string[]>;
  constructor(
    private populationService: PopulationService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.gnomesInformation$ = this.populationService.gnomesInformation$;
    this.filtersApplied$ = this.populationService.filtersApplied$;
  }

  ngOnInit() {
    this.populationService.loadData().subscribe(noop);
  }

  goToGnomeDetail(gnome: Gnome) {
    this.populationService.setGnomeSelected(gnome);

    this.router.navigate(['/inhabitant-detail', gnome.id]);
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: InhabitantsFilterModalComponent
    });
    return await modal.present();
  }

  searchByName($event) {
    const value: string = $event.target.value;
    const filter = this.populationService.filter;
    filter.name = value;
    this.populationService.filterDataset(filter);
  }
}
