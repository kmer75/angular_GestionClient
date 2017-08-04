import { ClientSearchService } from './services/client-search-service';
import { ClientService } from './services/client.service';
import { ClientFirebaseService } from './services/client-firebase.service';
import { MarkerCluster } from './client-geolocalisation/marker.cluster';
import { InMemoryDataService } from './services/in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientSaveComponent } from './client-save/client-save.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ClientGeolocalisationComponent } from './client-geolocalisation/client-geolocalisation.component';
import { ClientDetailCompleteComponent } from './client-detail-complete/client-detail-complete.component';
import { ClientAccueilComponent } from './client-accueil/client-accueil.component';
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbsHKzXuELRvYsyTzxpWtDmpe9zOyqQWU',
      libraries: ["places"]
    })
  ],
  providers: [ClientService, ClientSearchService, InMemoryDataService, ClientFirebaseService],

  declarations: [ClientComponent,
  MarkerCluster,
    ClientDashboardComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientSaveComponent, 
    ClientGeolocalisationComponent, 
    ClientDetailCompleteComponent, 
    ClientAccueilComponent],

  exports: [ClientComponent]
})
export class ClientModule { }
