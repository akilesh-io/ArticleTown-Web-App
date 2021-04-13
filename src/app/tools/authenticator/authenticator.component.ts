import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  
  constructor() {  }
  ngOnInit(): void {
  }
  state = AuthenticatorCompState.LOGIN;

  //Navigate between login reset create using ng-if directive
  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }
  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }



  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPassword(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
}

export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}