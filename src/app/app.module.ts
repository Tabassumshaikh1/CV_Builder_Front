import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { UserDashboardComponent } from './Component/user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MyResumeComponent } from './Component/my-resume/my-resume.component';
import { ViewResumeComponent } from './Component/view-resume/view-resume.component';
import { HeaderComponent } from './Component/header/header.component';
import { HomeComponent } from './Component/home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { UpdatecvComponent } from './Component/updatecv/updatecv.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    MyResumeComponent,
    ViewResumeComponent,
    HeaderComponent,
    HomeComponent,
    UpdatecvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
ReactiveFormsModule,
BrowserAnimationsModule,
MatIconModule,
MatButtonModule,
MatSelectModule,
MatMenuModule,
MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
