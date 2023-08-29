import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnDestroy{
  constructor(private router:Router,private authService:UserAuthService){

  }
  userAvatar?:string=""
  ngOnInit(): void {
     this.getUserAvatar()
  }

  private getUserAvatar(){
    const username=this.authService.getUserName()
    if(username){
    const words = username.split(" ");
     this.userAvatar = words.map(word => word[0].toUpperCase()).join("");
     console.log(words)
     console.log(this.userAvatar)
    }
  }

  public logout(){
    this.authService.clear()
    this.router.navigate(['/login'])

  }
  ngOnDestroy(): void {
  }

}
