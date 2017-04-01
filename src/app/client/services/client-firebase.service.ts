import { firebaseConfig } from './../../firebase.config';
import { Injectable } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { AngularFire } from "angularfire2";
import { Client } from './../client';

@Injectable()
export class ClientFirebaseService {

  constructor(private af: AngularFire) {
    
  }

getClients() {
  let clients$ = this.af.database.list('clients');
    clients$.subscribe(
      val => console.log(val)
    )
}

}
