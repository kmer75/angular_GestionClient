import { AdminService } from './admin.service';
import { Component, ElementRef, OnInit, OnChanges } from '@angular/core';
import { Admin } from "app/admin";
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  elementRef: ElementRef;
    constructor(elementRef: ElementRef, private adminService : AdminService) {
        this.elementRef = elementRef;
    }

    admin : Admin;

    getAdmin () : Admin{
      return this.adminService.admin;
    }

     ngOnInit(): void {
        this.admin = this.getAdmin();
        //console.log(this.adminService.admin);
    }

}
