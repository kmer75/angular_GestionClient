import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClientSearchService } from './../client-search-service';
import { ClientService } from './../client.service';
import { Client } from './../client';
import {
  Component, OnInit, Input, EventEmitter, Output, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Router } from "@angular/router";


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class ClientDetailComponent implements OnInit {

  constructor(private clientService: ClientService,
  private clientSearchService: ClientSearchService,
    private route: ActivatedRoute,
    private router: Router) { }
  lat: number = 51.678418;
  lng: number = 7.809007;

  client: Client;
  identifiant: number;

  @Input() clientDetail: Client = null;

  ngOnInit() {
    this.gotoDetail(this.clientDetail);
  }

  @Output() eventDeletedClient = new EventEmitter<Client>();

  onEdit(client: Client) {

    this.router.navigate(['/client/edit', client.id]);

  }

  onDetail(client: Client) {
    this.router.navigate(['/client/detail', client.id]);
  }

  onDelete(client: Client) {
    this.clientService.delete(client.id)
      .subscribe((success) => {
        this.clientDetail = null;
        this.eventDeletedClient.emit(client);
        alert('delete success');
      },
      (error)=>alert('erreur lors de la suppression')
      );
  }

  ngOnChanges(changes) {
    if (changes.clientDetail) {
      alert('changement');
      console.log(this.clientDetail);
    }
  }

term : string;
clients: Observable<Client[]>;
  private searchTerms = new Subject<string>();
  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  assignNewClientDetail(client: Client) {
    this.clientDetail = client;
  }


  gotoDetail(client: Client): void {
    // let link = ['/client/edit', client.id];
    // this.router.navigate(link);
    this.term = "";
    this.clients = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.clientSearchService.search(this.term)
        // or the observable of empty clientes if no search term
        : Observable.of<Client[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Client[]>([]);
      });
  }

  id : number = 1;

  getClientDetail() {
    this.clientService.getClient(this.id).subscribe(client=>this.clientDetail=client);
    this.route.params
        .switchMap((params: any) => {
          var client = this.clientService.getClient(params['id']);
          return client;
        })
        .subscribe((client) => {
          this.client = client as Client;
        });
    }
  }



}
