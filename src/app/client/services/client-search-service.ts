import { Client } from './../client';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientSearchService {
    constructor(private http: Http) { }

    search(term: string): Observable<Client[]> {
        return this.http
            .get(`api/clients?prenom=${term}`)
            .map((r: Response) => r.json().data as Client[])
            .catch((error: any) => {
                console.error('An friendly error occurred', error);
                return Observable.throw(error.message || error);
            });
    }
}
