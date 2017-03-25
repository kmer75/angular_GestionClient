import { ClientStartComponent } from './../client/client/client-start/client-start.component';
import { ClientDashboardComponent } from './../client/client/client-dashboard/client-dashboard.component';
import { ClientListComponent } from './../client/client/client-list/client-list.component';
import { CLIENT_ROUTE } from './../client/client-route';
import { ClientDetailComponent } from './../client/client/client-detail/client-detail.component';
import { ClientSaveComponent } from './../client/client/client-save/client-save.component';
import { ClientDetailCompleteComponent } from './../client/client/client-detail-complete/client-detail-complete.component';
import { ClientGeolocalisationComponent } from './../client/client/client-geolocalisation/client-geolocalisation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './../client/client/client.component';
import { PatronComponent } from './../shared/patron/patron.component';

const routes: Routes = [
  {
    path: 'test',
    component: PatronComponent
  },
  {
    path: 'dashboard',
    component: ClientDashboardComponent
  },
    {
    path: 'geolocalisation',
    component: ClientGeolocalisationComponent
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },

  {
    path: 'client',
    component: ClientComponent,
  },
  
  {
    path: 'client/:id',
    component: ClientComponent,
  },
  {
    path: 'client/add', component: ClientSaveComponent
  },

  {
    path: 'client/edit/:id', component: ClientSaveComponent
  },
  {
    path: 'client/detail/:id', component: ClientDetailCompleteComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
