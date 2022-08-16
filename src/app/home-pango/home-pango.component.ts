import { Component, OnInit } from '@angular/core';
import { BackendService} from '../services/backend.service.ts.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home-pango',
  templateUrl: './home-pango.component.html',
  styleUrls: ['./home-pango.component.css']
})
export class HomePangoComponent implements OnInit {
  monUser!:any;
  role!:any;
  modificationEncours=false;
    //les variable qui permettra d'utiliser le  ngModel 
    imageUrl: string = '';
    description: string = '';
  constructor(private authService:AuthService,private backendService:BackendService,private http:HttpClient) { }

  ngOnInit(): void {
setTimeout(()=>{
  this.monUser=this.getAuthInfos();
},100);
  }


  getAuthInfos(){
    this.backendService.getRouteUserId(this.authService.getId()).subscribe((reponse:any)=>{
      this.monUser=reponse;
      this.backendService.getRouteRoleId(reponse.role).subscribe((reponse)=>{
        this.role=reponse;
      },(error)=>{
        console.log('Erreur:',error)
      });
    },(error)=>{
      console.log('Erreur:',error)
    });
  }
  submit (form: NgForm) {

    this.http.put(this.backendService.getRouteModifyUser(this.authService.id),
    {
      imageUrl:form.value.imageUrl,
      description:this.description}).subscribe((reponse)=> {
        this.modificationEncours=false;
        this.ngOnInit();
    },(error)=>{
      console.log('Erreur:',error)
    });
  }
}
