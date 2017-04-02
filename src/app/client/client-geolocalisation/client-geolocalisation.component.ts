import { ClientFirebaseService } from './../services/client-firebase.service';
import { ClientService } from './../services/client.service';
import { Component, OnInit, OnChanges, ElementRef } from '@angular/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { Router } from '@angular/router';
import { Client } from './../Client';
import { points } from './points';
declare var jQuery: any;

@Component({
  selector: 'app-client-geolocalisation',
  templateUrl: './client-geolocalisation.component.html',
  styleUrls: ['./client-geolocalisation.component.css']
})
export class ClientGeolocalisationComponent implements OnInit {
elementRef: ElementRef;
  constructor(elementRef: ElementRef,
  private clientService: ClientService,
  private clientFbService : ClientFirebaseService,
   private router: Router) { this.elementRef = elementRef;}

  ngOnInit() {
    //this.points = points;
    this.getClients();
  }

  points: any[] = [];

  clients: Client[] = [];
  getClients(): void {
    this.clientFbService.getClients().subscribe(data => {
      this.clients = data;
      this.getMarkers(data);
      this.points = data;
    });
  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 48.8665906;
  lng: number = 2.317465200000015;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    //action
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  getMarkers(clients): void {

    clients.forEach(client => {
      this.markers.push({
        lat: client.adresse.latitude,
        lng: client.adresse.longitude,
        label: client.prenom[0],
        draggable: false,
        client : client
      });
    });
  }

  markers: marker[] = [];

  goToDetail(id : string) {
    this.router.navigate(['/client/detail', id]);
  }

}



// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  client : Client
}