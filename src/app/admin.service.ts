import { Admin } from './admin';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor() { }
  admin : Admin = {
    nom : 'doe',
    prenom : 'john',
    imgPath : 'https://kylebrycegd.files.wordpress.com/2015/12/unknown-8.jpg'
  };

  update(admin : Admin) {
    this.admin = admin;
  }
  
  
}
