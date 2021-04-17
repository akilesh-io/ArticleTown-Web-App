import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Material UI imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

//Importing FirebaseTS
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp'

//Importing Firebase config files 
import { environment } from 'src/environments/environment';

//Importing data service files
import { UserArticlesService} from './datas/user-articles/user-articles.service';
import { UserDatasService} from './datas/user-details/user-datas.service';

//Importing pages/home,authenticator,....
import { HomeComponent } from './pages/home/home.component';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { SettingsComponent } from './pages/settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatBottomSheetModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers:[
    UserArticlesService,
    UserDatasService
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { 
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
