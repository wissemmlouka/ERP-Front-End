import { Component } from '@angular/core';
import { UserAuthService } from './_services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ERP-Front';
  constructor(private userAuthService:UserAuthService){}
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
}
