import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginModel } from 'src/app/_models/login.model';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  loginForm!: FormGroup;
  resetForm!:FormGroup;
  authError:string=""
  invalidPass:boolean=false
  invalidEmail:boolean=false
  isLoad:boolean=false;
  constructor(private router:Router,private authService:UserAuthService,private userService:UserService, private formBuilder:FormBuilder){
     if( authService.isLoggedIn()){
          router.navigate(['/home'])
     }
  }
 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
public reset(){}
public login(){
   if(!this.loginForm.valid){
    return;
   }
   this.invalidEmail=false;
   this.invalidPass=false;
   this.authError=""
  const loginData:LoginModel={
     email:this.loginForm.value.email,
     password:this.loginForm.value.password
  }
 this.isLoad=true;
  this.userService.login(loginData).subscribe(
    (data)=>{
      this.isLoad=false
      this.authService.setToken(data.token)
      this.authService.setRoles(data.user.roles)
      this.authService.setUserName(data.user.username)
      this.router.navigate(["/home"])
    console.log(data)
    },
    (error)=>{
      this.isLoad=false
      switch (error.error) {
        case "Invalid user":
          this.invalidEmail=true;
          break;
          case "Invalid email":
          this.invalidEmail=true
          break;
          case "Invalid password":
          this.invalidPass=true
          break;
          case "User is disabled":
          this.authError="User is disabled! please active your account."
          break;
        default:
          this.authError="A problem has been occurred at the server, please try again."
          break;
      }
      console.log(error.error)
    }
  )
}


  ngOnDestroy(): void {
  }

}
