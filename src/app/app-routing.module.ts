import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:"",component: HomeComponent},
  {path:"emailVerificarion",component: EmailVerificationComponent},
  {path:"**",component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
