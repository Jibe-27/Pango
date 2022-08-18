import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AppComponent } from "../app.component";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    isAuth = false;
    
    id:any;
    subject=new Subject();
    constructor(private router: Router){}
    signIn(infos:any) {
        localStorage.setItem('id',infos.userId);
        this.id=localStorage.getItem('id');
        this.isAuth=true;
        this.router.navigate(['']);  
       this.subject.next(this.isAuth);
    }

    signOut() {
        this.isAuth = false;
        localStorage.removeItem('id');
        this.subject.next(this.isAuth);
    }
    checkAuth(){
        if(localStorage.getItem('id')){
            this.isAuth=true;
            return true;
        }
        else{
            return false;
        }
    } 
getId(){
    if(localStorage.getItem('id')){
        this.id=localStorage.getItem('id');
        return this.id;
    }

}
}