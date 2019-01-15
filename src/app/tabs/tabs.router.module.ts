import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'town',
        children: [
          {
            path: '',
            loadChildren: '../town/town.module#TownPageModule'
          }
        ]
      },
      {
        path: 'inhabitants-list',
        children: [
          {
            path: '',
            loadChildren: '../inhabitants/inhabitants.module#InhabitantsPageModule'
          }
        ]
      },
      {
        path: 'my-character',
        children: [
          {
            path: '',
            loadChildren: '../my-character/my-character.module#MyCharacterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/town',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/town',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
