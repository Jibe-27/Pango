import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service.ts.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  idUser:any;
  user:any;
  roleUser:any;
  idAuthUser!:string;
  estMonAmis!:boolean;
  message!:string;
  constructor(private route: ActivatedRoute,private router:Router,private backendService:BackendService,private http:HttpClient,private authService:AuthService) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');// recupere l'identifiant dans l'url
    this.estMonAmis =this.router.url.split("/")[1]=='amis'? true:false;// return true si le lien est localhot:4200/amis/...
    this.idAuthUser=this.authService.getId();
    this.getAuthInfos();
  }
  getAuthInfos(){
    this.backendService.getRouteUserId(this.idUser).subscribe((reponse:any)=>{
      this.user=reponse;
      this.backendService.getRouteRoleId(reponse.role).subscribe((reponse)=>{
        this.roleUser=reponse;
      },()=>{
        this.message='erreur'; 

      });
    },()=>{
      this.message='erreur'; 
    });
  }
  addUser(){
    this.http.post(this.backendService.getPostRouteAmi(),{userDemandeur:this.idAuthUser,user:this.idUser}).subscribe(()=>{
      this.router.navigate(['/amis/'+this.idUser]);  
      this.message='succes'; 
    },()=>{
      this.message='erreur';
    });
  }
  deleteAmis(){
    this.http.delete(this.backendService.GetRouteDeleteAmis(this.idUser)).subscribe(()=>{
      this.router.navigate(['/user/'+this.idUser]); 
      this.message='succes'; 
    },()=>{
      this.message='erreur';
    });
  }
}
