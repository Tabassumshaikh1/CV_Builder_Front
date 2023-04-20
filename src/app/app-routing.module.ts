import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { MyResumeComponent } from './Component/my-resume/my-resume.component';
import { RegisterComponent } from './Component/register/register.component';
import { UpdatecvComponent } from './Component/updatecv/updatecv.component';
import { UserDashboardComponent } from './Component/user-dashboard/user-dashboard.component';
import { ViewResumeComponent } from './Component/view-resume/view-resume.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  }
  ,
  {
    

    path:'login', 
    component:LoginComponent
  },
  {
    path:'regis',
    component:RegisterComponent
  },
  {
    path:'userdash',
    component:UserDashboardComponent

  },
  {
    path:'myresume',
    component:MyResumeComponent
  },
  {
    path:'viewresume/:id',
    component:ViewResumeComponent
  },
  {
    path:'update/:id',
    component:UpdatecvComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
