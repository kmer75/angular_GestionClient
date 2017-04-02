import { Observable } from 'rxjs/Observable';
import { firebaseConfig } from './../../firebase.config';
import { Injectable } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { AngularFire } from "angularfire2";
import { Client } from './../client';

@Injectable()
export class ClientFirebaseService {

  constructor(private af: AngularFire) {
    
  }



getClients() : Observable<Client[]> {
  let clients$ = this.af.database.list('/clients');
    clients$.subscribe(
      val => console.log(val)
    )
    return clients$;
}


getClient(key: string) : Observable<Client> {
    let client$ = this.af.database.object('/clients/'+key);
    return client$;
  }

  update(client: Client) {
    let client$ = this.af.database.object('/clients/'+client.$key);
    client$.update(client).then(()=>
    {
      console.log('update de '+client.prenom);
      return client
    }).catch(this.handleError);
  }

  create(client: Client) {
    let clients$ = this.af.database.list('/clients');
    clients$.push(client).then(()=>console.log('creation de '+ client.prenom)).catch(this.handleError);
  }

  save(client: Client) {
    if (client.id) {
      return this.update(client);
    }
    client.id = Math.floor((Math.random() * 10000) + 1);
    return this.create(client);
  }

  delete(key: string) : Promise<any>{
   let client$ = this.af.database.object('/clients/'+key);
    return client$.remove()
    .then(()=>console.log('suppression du client numero '+key))
    .catch(this.handleError) as Promise<any> ;
    //ou
    // let clients$ = this.af.database.list('/clients');
    // clients$.remove(''+id).then(_ => console.log('item deleted!'))
  }


  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
