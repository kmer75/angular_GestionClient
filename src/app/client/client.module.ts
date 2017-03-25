import { ClientSearchService } from './client/client-search-service';
import { MarkerCluster } from './client/client-geolocalisation/marker.cluster';
import { ClientService } from './client/client.service';
import { InMemoryDataService } from './client/in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientStartComponent } from './client/client-start/client-start.component';
import { ClientSaveComponent } from './client/client-save/client-save.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ClientGeolocalisationComponent } from './client/client-geolocalisation/client-geolocalisation.component';
import { ClientDetailCompleteComponent } from './client/client-detail-complete/client-detail-complete.component';


@NgModule({
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbsHKzXuELRvYsyTzxpWtDmpe9zOyqQWU',
      libraries: ["places"]
    })
  ],
  providers: [ClientService, ClientSearchService, InMemoryDataService],

  declarations: [ClientComponent,
    MarkerCluster,
    ClientDashboardComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientStartComponent,
    ClientSaveComponent,
    ClientGeolocalisationComponent,
    ClientDetailCompleteComponent],

  exports: [ClientComponent]
})
export class ClientModule { }
