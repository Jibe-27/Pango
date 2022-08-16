import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service.ts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient,private backendService:BackendService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getRolesList();
  }
  //les variable qui permettra d'utiliser le  ngModel 
  pseudo: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  imageUrl: string = '';
  description: string = '';
  //recuperation de la liste des roles pour le select dans signup.component.html
  listRole:any;
  getRolesList(){
    this.backendService.getRouteRoles().subscribe((reponse)=> {
      this.listRole=reponse;
   },(error)=>{
     console.log('Erreur:',error)
   })
  }
  
  //action au bouton du form
  submit (form: NgForm) {
    console.log('user'+form.value.pseudo,
      'imageUrl:'+this.imageUrl,
      'description:'+this.description,
      'role: '+form.value.role,
      'email: '+form.value.email,
      'password:'+form.value.password);

    this.http.post(this.backendService.getRouteSignUp(),
    {
      user: form.value.pseudo,
      imageUrl:this.imageUrl,
      description:this.description,
      role: form.value.role,
      email: form.value.email.toLowerCase(),
      password:form.value.password}).subscribe((reponse)=> {

      this.http.post(this.backendService.getRouteLogin(),
      {email: form.value.email.toLowerCase(),
        password:form.value.password}).subscribe((reponse)=> {
        this.authService.signIn(reponse);
      },(error)=>{
        console.log('Erreur:',error)
      });
    },(error)=>{
      console.log('Erreur:',error)
    });
  }
}
