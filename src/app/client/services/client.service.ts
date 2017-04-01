import { Client } from './../client';
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class ClientService implements OnInit {

  constructor(private http: Http) { }


  clientUrl: string = "api/clients";
  headers = new Headers({ 'Content-Type': 'application/json' });
  
  getClients() {
    return this.http.get(this.clientUrl)
    .map((data:Response) => data.json().data);
  }

  getClient(id: number) {
    return this.http.get("api/clients/" + id).
    map((data:Response) => data.json().data);
  }



  update(client: Client) {
    const url = `${this.clientUrl}/${client.id}`;
    return this.http
      .put(url, JSON.stringify(client), { headers: this.headers })
      .subscribe(() => client);
      
  }

  create(client: Client) {
    return this.http
      .post(this.clientUrl, client, { headers: this.headers })
      .subscribe(res => res.json().data);
  }

  save(client: Client) {
    if (client.id) {
      return this.update(client);
    }
    return this.create(client);
  }

  delete(id: number) {
    console.log('id numero : ' + id);
    const url = `${this.clientUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .map(() => { console.log('client numero ' + id + ' supprime'); return null; });
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  ngOnInit() {
  }


}