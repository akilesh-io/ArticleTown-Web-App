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

  title = 'Social-Media';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument: UserDocument;
  private static userDocument: UserDocument;

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
              AppComponent.userDocument = null;
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

  public static getUserDocument(){
    return AppComponent.userDocument;
  }
  getUsername(){
    try {
      return AppComponent.userDocument.publicName;
    } catch (err) {
      
    }
  }


  getUserProfile() {
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: ["User", this.auth.getAuth().currentUser.uid],
        onUpdate: (result) => {
          this.userDocument = <UserDocument>result.data();
          this.userHasProfile = result.exists;

          if (this.userDocument) {
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


export interface UserDocument {
  publicName: string;
  firstname: string;
  lastname: string;
  description: string;
  userId: string;
}
