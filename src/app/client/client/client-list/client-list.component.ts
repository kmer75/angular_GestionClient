import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ClientService } from './../client.service';
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

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute,) { }



  clients: Client[] = [];
  @Output() event = new EventEmitter();

  onSelect(c: Client) {
    this.event.emit(c);
    this.router.navigate(['/client/'+c.id])
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
      this.deleteClient(this.clientToDelete);
    }

  }

  deleteClient(client: Client) {
    this.clients = this.clients.filter(c => c != client);
  }

  changeState() {
    this.state = !this.state;
  }

  state: boolean = false;

  ngOnInit() {
    this.changeState();
    var that = this;
    this.getClients().subscribe(
      (success) => {
        setTimeout(function () {
          that.changeState();
        }, 500);
      },
      (fail) => alert('fail')
    );
  }

}
