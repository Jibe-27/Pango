import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }

  getRouteUser(){
    return this.http.get('/api/user');
  }
  getRouteUserId(id:any){
    return this.http.get('/api/user/'+id);
  }
  getRouteSignUp(){
    return '/api/user/signup';
  }
  getRouteLogin(){
    return '/api/user/login';
  }
  getRouteRoles(){
    return this.http.get('/api/roles');
  }
  getRouteRoleId(id:any){
    return this.http.get('/api/roles/'+id);
  }
  getRouteAmis(id:string){
    return this.http.get('/api/amis/'+id);
  }
  getRouteAmisId(id:string){
    return this.http.get('/api/amis/one/'+id);
  }
  getPostRouteAmi(){
    return '/api/amis/addAmi';
  }
  getRouteModifyUser(id:string){
    return '/api/user/'+id;
  }
  GetRouteDeleteAmis(id:string){
   return '/api/amis/'+id;

  }
}
