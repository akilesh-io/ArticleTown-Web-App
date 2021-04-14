import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';  //Import the FirebaseTSAuth class

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  //Instantiate an FirebaseTSAuth object.
  private auth: FirebaseTSAuth;
  constructor() {
    this.auth = new FirebaseTSAuth();
  }
  ngOnInit(): void {
  }

  //Create Account Firebase works *reference*: (https://codeible.com/view/course/inGXZQSL9Xp7X7iSzuyZ;title=Firebase%20Authentication:%20Creating%20Users)
  //-----Create-----
  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;
    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ) {
      this.auth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Account Created");
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value + "";
          },
          onFail: (err) => {
            alert("Failed to Sign in...");
          }
        }
      );
    }
  }

  //-----Login-----
  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ) {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.auth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Login Successful");
          },
          onFail: (err) => {
            alert(err);
          }

        },
      );
    }

  }

  //-----Reset Password-----
  onResetPassword(resetPassword:HTMLInputElement){
    let email = resetPassword.value;
    if(this.isNotEmpty(email)){
      this.auth.sendPasswordResetEmail(
        {
          email:email,
          onComplete: (uc) => {
            alert(`Reset password has been sent to ${email}`);
          }
        }
      );
    }
  }

  //Checking if the mail or password is correctly filled
  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, ComparedWith: string) {
    return text == ComparedWith;
  }

  //Navigate between login reset create using ng-if directive
  state = AuthenticatorCompState.LOGIN;

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }
  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }
  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }



  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPassword() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}