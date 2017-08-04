import { AdminComponent } from './../admin/admin.component';
import { ClientDashboardComponent } from './../client/client-dashboard/client-dashboard.component';
import { ClientListComponent } from './../client/client-list/client-list.component';
import { ClientDetailComponent } from './../client/client-detail/client-detail.component';
import { ClientSaveComponent } from './../client/client-save/client-save.component';
import { ClientDetailCompleteComponent } from './../client/client-detail-complete/client-detail-complete.component';
import { ClientGeolocalisationComponent } from './../client/client-geolocalisation/client-geolocalisation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './../client/client.component';
import { ClientAccueilComponent } from "app/client/client-accueil/client-accueil.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
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
    children : [

      {
        path: '', component: ClientAccueilComponent
      },

      {
        path: 'add', component: ClientSaveComponent
      },

      {
        path: 'edit/:id', component: ClientSaveComponent
      },
      {
        path: 'detail/:id', component: ClientDetailCompleteComponent
      }
    ]
  },
  
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
