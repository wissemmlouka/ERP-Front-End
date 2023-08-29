import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  
  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRoles(): any {
    const roles: any = localStorage.getItem('roles');

    return JSON.parse(roles);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getUserName(): string | null {
    return localStorage.getItem('username');
  }
  public setUserName(username: string) {
    localStorage.setItem('username', username);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }


}
