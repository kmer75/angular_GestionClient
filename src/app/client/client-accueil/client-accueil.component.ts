import { Component, OnInit } from '@angular/core';
import { Animations } from "app/shared/animation";
import { Client } from "app/client/client";

@Component({
  selector: 'app-client-accueil',
  templateUrl: './client-accueil.component.html',
  styleUrls: ['./client-accueil.component.css'],
      host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ClientAccueilComponent implements OnInit {

  constructor() { }

  selectedClient: Client;

  ngOnInit() {
  }

  assignDeletedClient(client: Client) {
    this.selectedClient = client;
    console.log('assign');
    console.log(this.selectedClient);
  }

}
