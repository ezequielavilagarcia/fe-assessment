import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InhabitantDetailPage } from './inhabitant-detail.page';
import { ProfessionsListComponent } from './components/professions-list/professions-list.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';

const routes: Routes = [
  {
    path: '',
    component: InhabitantDetailPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [InhabitantDetailPage, ProfessionsListComponent, FriendsListComponent]
})
export class InhabitantDetailPageModule {}
