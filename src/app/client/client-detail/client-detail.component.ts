import { ClientFirebaseService } from './../services/client-firebase.service';
import { ClientSearchService } from './../services/client-search-service';
import { ClientService } from './../services/client.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
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
import { Router, Params } from "@angular/router";


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
  private clientFbService : ClientFirebaseService,
  private clientSearchService: ClientSearchService,
    private route: ActivatedRoute,
    private router: Router) { }
  lat: number = 51.678418;
  lng: number = 7.809007;

  client: Client;

  //@Input() 
  clientDetail: Client;

  ngOnInit() {
    this.gotoDetail(this.clientDetail);

    this.clientDetail = null;
    
    this.route.queryParams.subscribe(
      (params : Params) =>
      {
        if(!params['id']) {
          this.clientDetail = null;
        }
        else {
        var key : string = params['id'];
        this.clientFbService.getClient(key).subscribe(
          client => this.clientDetail = client
        );
        }
      } 
    );
  }



  @Output() eventDeletedClient = new EventEmitter<Client>();

  onEdit(client: Client) {

    this.router.navigate(['/client/edit', client.$key]);

  }

  onDetail(client: Client) {
    this.router.navigate(['/client/detail', client.$key]);
  }

  // onDelete(client: Client) {
  //   this.clientService.delete(client.id)
  //     .subscribe(() => {
  //       this.clientDetail = null;
  //       this.eventDeletedClient.emit(client);
  //       console.log('client ds la methode success du delete (then) :');
  //       console.log(client)
  //     },
  //     ()=>{alert('erreur lors de la suppression')}
  //     );
  // }

  
  onDelete(client: Client) {
    this.clientFbService.delete(client.$key)
      .then(
      (success) => {
        this.clientDetail = null;
        this.eventDeletedClient.emit(client);
        console.log('client ds la methode success du delete (then) :');
        console.log(client)
      });
  }

term : string;
clients: Observable<Client[]>;
  private searchTerms = new Subject<string>();
  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  gotoDetail(client: Client): void {
    // let link = ['/client/edit', client.id];
    // this.router.navigate(link);
    this.clientDetail = client;
    console.log(client);
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



}
