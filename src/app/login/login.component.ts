import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private http:HttpClient,private backendService:BackendService,) { }

  ngOnInit(): void {
  }

  password: string = '';
  email: string = '';

  
  submit (form: NgForm) {

    this.http.post(this.backendService.getRouteLogin(),{email: form.value.email.toLowerCase(),password:form.value.password}).subscribe((reponse)=> {
      this.authService.signIn(reponse);
    },(error)=>{
      console.log('Erreur:',error)
    });
  }

}
