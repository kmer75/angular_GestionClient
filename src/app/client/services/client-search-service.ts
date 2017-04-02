import { AngularFire } from 'angularfire2';
import { Client } from './../client';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientSearchService {
    constructor(private http: Http, private af: AngularFire) { }

    // search(term: string): Observable<Client[]> {
    //     return this.http
    //         .get(`api/clients?prenom=${term}`)
    //         .map((r: Response) => r.json().data as Client[])
    //         .catch((error: any) => {
    //             console.error('An friendly error occurred', error);
    //             return Observable.throw(error.message || error);
    //         });
    // }

    search(term: string): Observable<Client[]> {
        let clients$ = this.af.database.list('/clients', {
            query: {
                orderByChild: 'prenom',
                equalTo: term,
                limitToFirst: 3,
            }
        });
        clients$.subscribe(
            val => console.log(val)
        )
        return clients$;
    }
}
