import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inhabitants-filter-modal',
  templateUrl: './inhabitants-filter-modal.component.html',
  styleUrls: ['./inhabitants-filter-modal.component.scss']
})
export class InhabitantsFilterModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
