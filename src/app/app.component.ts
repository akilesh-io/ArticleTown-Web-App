import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Article-Town';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument: UserDocument;

  constructor(private loginSheet: MatBottomSheet,
    private router: Router
  ) {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {

            },
            whenSignedOut: user => {

            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerificarion"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();

            },
            whenChanged: user => {

            }
          }
        );
      }
    );
  }

  getUserProfile() {
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: ["User", this.auth.getAuth().currentUser.uid],
        onUpdate: (result) => {
          this.userDocument = <UserDocument>result.data();          
          this.userHasProfile = result.exists;

          if(this.userDocument){
            this.router.navigate(["postfeed"]);
          }
        }
      }
    );
  }
  loggedIn() {
    return this.auth.isSignedIn();
  }
  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }
  onLogoutClick() {
    this.auth.signOut();
    this.router.navigate([""]);
  }


}


export interface UserDocument{
  firstname: string;
  lastname: string;

}
