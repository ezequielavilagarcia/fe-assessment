import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InhabitantsPage } from './inhabitants.page';
import { InhabitantsFilterModalComponent } from './components/inhabitants-filter-modal/inhabitants-filter-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InhabitantsPage }]),
    SharedModule
  ],
  declarations: [InhabitantsPage, InhabitantsFilterModalComponent],
  entryComponents: [InhabitantsFilterModalComponent]
})
export class InhabitantsPageModule {}
