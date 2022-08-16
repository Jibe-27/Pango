import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePangoComponent } from './home-pango/home-pango.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component'; 
import { AuthGuard } from './services/auth.guard.service';
import { UserDetailComponent } from './users-list/user-detail/user-detail.component';
import { BackendService } from './services/backend.service.ts.service';
import { AuthService } from './services/auth.service';
//GESTION DES ROUTES
const routes:Routes=[
  {path:"" ,canActivate:[AuthGuard], component:HomePangoComponent},
  {path:"amis" ,canActivate:[AuthGuard], component:UsersListComponent},
  {path:"amis/:id" ,canActivate:[AuthGuard], component:UserDetailComponent},
  {path:"roles" ,canActivate:[AuthGuard], component:RoleComponent},
  {path:"user" ,canActivate:[AuthGuard], component:UsersListComponent},
  {path:"user/:id" ,canActivate:[AuthGuard], component:UserDetailComponent},
  {path:"login" , component:LoginComponent},
  {path:"signup" , component:SignupComponent},
  {path:"not-found" , component:FourOhFourComponent},
  {path:"**" , redirectTo:'not-found'}
  
];
@NgModule({
  declarations: [
    AppComponent,
    HomePangoComponent,
    RoleComponent,
    LoginComponent,
    SignupComponent,
    UsersListComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
  ,
  providers: [AuthGuard,BackendService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
