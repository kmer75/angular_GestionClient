import { ClientModule } from './client/client.module';
import { firebaseConfig } from './firebase.config';
import { AdminService } from './admin.service';
import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import {AngularFireModule} from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent, AdminComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    ClientModule
  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
