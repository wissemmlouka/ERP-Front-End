import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { ForbiddenComponent } from './_components/forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
{path:'login' , component:LoginComponent},
{path:'home',component:HomeComponent ,canActivate:[AuthGuard],data: { roles: ['ADMIN','RESPONSABLE','COMPTABLE'] }},
{path:'',component:HomeComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN','RESPONSABLE','COMPTABLE'] }},
{path:'forbidden',component:ForbiddenComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN','RESPONSABLE','COMPTABLE']}},
{path:'**',redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
