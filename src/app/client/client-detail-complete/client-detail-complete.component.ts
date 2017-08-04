import { ClientFirebaseService } from './../services/client-firebase.service';
import { ClientService } from './../services/client.service';
import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Client } from './../Client';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-client-detail-complete',
  templateUrl: './client-detail-complete.component.html',
  styleUrls: ['./client-detail-complete.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
          'border-bottom': '#555555 3px solid'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 200 ease-out', style({
          backgroundColor: '#eb6d6d',
          opacity: 0,
          transform: 'scale(0)'
        }))
      ])
    ])
  ]
})
export class ClientDetailCompleteComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private clientFbService: ClientFirebaseService, private router: Router,
    private location: Location,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getClient();
  }

  client: Client;

  getClient() {
    this.route.params
      .switchMap((params: any) => {
        var client = this.clientFbService.getClient(params['id']);
        return client;
      })
      .subscribe(client => {
        this.client = client as Client;
      });
  }

  goList() {
    this.router.navigate(['/client'])
  }

  onEdit(client: Client) {
    this.router.navigate(['/client/edit', client.$key]);
  }

  onDelete(client: Client) {
    this.clientFbService.delete(client.$key)
      .then(
      (success) => {
        this.router.navigate(['/client']);
      });
  }


}