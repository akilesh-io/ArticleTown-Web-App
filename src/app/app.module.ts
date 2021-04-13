import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material UI Browser Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Importing FirebaseTS
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'

//Importing Firebase config files 
import { environment } from 'src/environments/environment';

//Importing pages/home
import { HomeComponent } from './pages/home/home.component';

//Angular material UI components Import
import { MatButtonModule } from '@angular/material/button'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
