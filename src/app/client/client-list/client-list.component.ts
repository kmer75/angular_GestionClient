import { ClientFirebaseService } from './../services/client-firebase.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ClientService } from './../services/client.service';
import {
  Component, OnInit, EventEmitter, Output, Input, OnChanges, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Client } from './../Client';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
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
export class ClientListComponent implements OnInit, OnChanges {

  constructor(private clientService: ClientService, private router: Router, private clientFBService : ClientFirebaseService) { }



  clients: Client[] = [];
  @Output() event = new EventEmitter();
  selectedClient: Client;

  onSelect(c: Client) {
    console.log('on select un client parmi ma liste');
    console.log(c);
    this.selectedClient = c;
    this.event.emit(c);

  }

  onAdd() {
    this.router.navigate(['/client/add']);
  }

  getClients(): Observable<any> {
    let response = this.clientService.getClients().share();
    response.delay(500).subscribe(
      (data) => { this.clients = data },
      (data) => { alert('error') }
    );
    return response;
  }

  @Input() clientToDelete: Client = null;

  ngOnChanges(changes) {
    if (changes.clientToDelete && this.clientToDelete != null) {
      console.log('changement variable client to delete');
      console.log(this.clientToDelete);
      this.deleteClient(this.clientToDelete);
    }

  }

  deleteClient(client: Client) {

    console.log('client venant de eventEmittter :')
    console.log(client);
    this.clients = this.clients.filter(c => c != client);

  }

  changeState() {
    this.state = !this.state;
  }

  state: boolean = false;

  ngOnInit() {
    this.clientFBService.getClients();
    this.changeState();
    console.log('state => ' + this.state);
    var that = this;
    this.getClients().subscribe(
      (success) => {
        setTimeout(function () {
          that.changeState();
          console.log('state => ' + this.state)
        }, 500);
      },
      (fail) => alert('fail')
    );
  }

}
