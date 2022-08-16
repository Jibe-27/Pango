import { HttpClient } from '@angular/common/http';
import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service.ts.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private http:HttpClient,private authService:AuthService,private backendService:BackendService,private router:Router) { }
  userAuthId!:any;
    listUser=new Array();
    typeUser!:string;
    message!:string;
  ngOnInit(): void {
    this.userAuthId=this.authService.getId();
    this.typeUser=this.router.url.split("/")[1];//pour afficher la liste des amis ou pas si le lien est localhost:4200/amis

    this.getUsersList();

  }

getUsersList(){
    let users=new Array();
    let amis=new Array();
    this.backendService.getRouteUser().subscribe((res:any)=> {
    users=res;
  },()=>{
    this.message='erreur'; 
  })
  this.backendService.getRouteAmis(this.userAuthId).subscribe((resAmis:any|object)=>{
    amis=resAmis;
  },
  (error)=>{
    this.message='erreur'; 
  });
  setTimeout(()=>{

    this.listUser=[];
    if(this.typeUser=='user'){//ce que retourne url

  if(amis.length<=0){
    this.listUser=users;
  }
  else{
    this.listUser=users;
    for (let j = 0; j < amis.length; j++) {
      for (let i = 0; i < this.listUser.length; i++) {
          if (amis[j].user === this.listUser[i]._id) {
          let v=users.findIndex(object => {
            return object._id === amis[j].user;
        
          });
          this.listUser.splice(v, 1);
              continue;
          }      
      }
    }
    
  }
      
    }
    else{
      users=[];
      for(var j =0; j<amis.length;j++){
          this.backendService.getRouteUserId(amis[j].user).subscribe((reponse)=> {
            this.listUser.push(reponse);
          },()=>{
            this.message='erreur'; 
          })
      }
    }
  },200)
}
  
  addUser(idAuthUser:string,idUser:string){
    this.http.post(this.backendService.getPostRouteAmi(),{userDemandeur:idAuthUser,user:idUser}).subscribe((reponse)=>{
      this.ngOnInit();
      this.message='succes'; 
        },()=>{
          this.message='erreur'; 
        });
  }

  deleteAmis(id:string){
    console.log(id)
    this.http.delete(this.backendService.GetRouteDeleteAmis(id)).subscribe((reponse)=>{
      this.ngOnInit();
      this.message='succes'; 
    },()=>{
      this.message='erreur'; 
    });
  }
}
