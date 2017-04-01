import { Client } from './../client';
import { Directive, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import { Observable } from 'rxjs';
import 'js-marker-clusterer/src/markerclusterer.js';

declare const google;
declare const MarkerClusterer;
declare var jQuery: any;

@Directive({
  selector: 'marker-cluster'
})
export class MarkerCluster implements OnInit {
  @Input()
  points: any[];



  @Output()
  eventDetailClientMap = new EventEmitter<Client>();

  onClickMapMarker(client) {
    this.eventDetailClientMap.emit(client);
  }

 test : string = 'test';

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {

    this.gmapsApi.getNativeMap().then(map => {

      var test = this.test;

      let infowindow = new google.maps.InfoWindow();
      var markers: any[] = [];
      var markerCluster: any;

      

      Observable
        .interval(500)
        .skipWhile((s) => this.points == null || this.points.length <= 0)
        .take(1)
        .subscribe(() => {
          if (markerCluster) {
            markerCluster.clearMarkers();
            markers = [];
          }
          if (this.points.length > 0) {
            for (let point of this.points) {
              let marker = new google.maps.Marker({
                position: new google.maps.LatLng(point.adresse.latitude, point.adresse.longitude),
                //icon : markerIcon,
                title: 'cliquer pour avoir le détail de ' + point.prenom
              });
              
              marker.addListener('click', function () {
 
                var html = '';
                html += '<div class="row">';
                html += '<div class="col-xs-6">';
                html += '<p>' + point.nom + ' ' + point.prenom + '</p>';
                html += '<a href="/client/detail/'+point.id+'">voir détail</a>';
                html += '</div>';
                html += '<div class="col-xs-6">';
                html += '<img class="col-xs-12" style="width:100px" src="' + point.imgPath + '"/>';
                html += '</div>';
                html += '</div>';

                infowindow.setContent(html);
                infowindow.open(map, marker);
              });
                markers.push(marker);
            }
          } else {
            markers = [];
            if (markerCluster) {
              markerCluster.clearMarkers();
            }
          }

          markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        })
    });
  }

}
