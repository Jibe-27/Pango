import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service.ts.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles!:any;
  roleUserId!:any;
  messageModif!:boolean;
  constructor(private backendService:BackendService,private authService:AuthService,private http:HttpClient) { }
  ngOnInit(): void {
    this.getRole();
    this.getRoleUserId();
  }
  getRole(){
    this.backendService.getRouteRoles().subscribe((reponse)=> {
         this.roles=reponse;
      },(error)=>{
        console.log('Erreur:',error)
      })
}
getRoleUserId(){
  this.backendService.getRouteUserId(this.authService.getId()).subscribe((reponse:any)=>{
    this.roleUserId=reponse.role;
  },(error)=>{
    console.log('Erreur:',error)
  });
}
modifyUser(idRole:string){
  this.http.put(this.backendService.getRouteModifyUser(this.authService.getId()),{role:idRole}).subscribe(()=>{
    this.ngOnInit();
    this.messageModif=true;
  },(error)=>{
    this.messageModif=false;
  });
}
}
