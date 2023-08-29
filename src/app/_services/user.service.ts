import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { LoginModel } from '../_models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8083';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData: any):Observable<any> {
    return this.httpClient.post(
      this.PATH_OF_API + '/registerNewUser',
      registerData
    );
  }

  public login(loginData: LoginModel):Observable<any> {
    return this.httpClient.post(this.PATH_OF_API + '/auth/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles: any[]): boolean {
    var isMatch = true;
    const roles: any = this.userAuthService.getRoles();
    if (roles != null && roles) {
      for (let i = 0; i < roles.length; i++) {
       
        if(!allowedRoles.includes(roles[i].roleName)){
          isMatch=false
          break
        }
      }
     
    }
    return isMatch;
  }
/*   public roleMatch(allowedRoles: any[]): boolean {
    let isMatch = false;
    const roles: any = this.userAuthService.getRoles();
    if (roles != null && roles) {
      let test = true;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName !== allowedRoles[i]) {
          test = false;
          break;
        }
       
      }
      isMatch = test;
    }
    return isMatch;
  } */
}
