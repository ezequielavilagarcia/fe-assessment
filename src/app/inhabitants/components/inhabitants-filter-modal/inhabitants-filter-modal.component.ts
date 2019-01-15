import { Component, OnInit, Inject } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { FilterData } from '../../models/filtar-data';
import { InhabitantsConfig, INHABITANTS_CONFIG } from '../../inhabitants.config';
import { PopulationService } from 'src/app/core/services/population.service';

@Component({
  selector: 'app-inhabitants-filter-modal',
  templateUrl: './inhabitants-filter-modal.component.html',
  styleUrls: ['./inhabitants-filter-modal.component.scss']
})
export class InhabitantsFilterModalComponent implements OnInit {
  hairColors$: Observable<string[]>;

  professions$: Observable<string[]>;

  filter: FilterData;

  inhabitantsConstants: InhabitantsConfig;
  constructor(
    private modalController: ModalController,
    private populationService: PopulationService,
    @Inject(INHABITANTS_CONFIG) inhabitantsConfig: InhabitantsConfig
  ) {
    this.inhabitantsConstants = inhabitantsConfig;
  }

  ngOnInit() {
    this.hairColors$ = this.populationService.hairColors$;
    this.professions$ = this.populationService.professions$;
    this.filter = this.populationService.filter;
  }

  close() {
    this.modalController.dismiss();
  }

  changeSortingAsc(value: boolean) {
    this.filter.sorting.asc = value;
    this.filter.sorting.desc = false;
  }

  changeSortingDesc(value: boolean) {
    this.filter.sorting.asc = false;
    this.filter.sorting.desc = value;
  }

  applyFilter() {
    this.populationService.filterDataset(this.filter);
    this.close();
  }
}
