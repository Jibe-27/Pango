import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BackendService} from './services/backend.service.ts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Pango';
  clickEventsubscription!:Subscription;
  constructor(private backendService:BackendService,private authService:AuthService,private router: Router){}

  ngOnInit(): void {
    this.etatIsAuth();
    if(!this.isAuth){
      this.router.navigate(['/login'])
    }
    this.authService.subject.subscribe((reponse)=>{
      this.ngOnInit();
      setTimeout(()=>{
        if(reponse){
          this.ngOnInit();
        }
      },1000);
    });
  }

  isAuth!:any; //etat user si connecté ou pas
 etatIsAuth(){
    this.isAuth=this.authService.checkAuth();// recupere l'etat dans auth service
 }
 signOut(){
  return this.authService.signOut();
  
 }

}
