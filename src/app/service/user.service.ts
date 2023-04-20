import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;

  token: any = localStorage.getItem('token');

  head_obj = new HttpHeaders().set('token', this.token);

  constructor(private http: HttpClient) {
    console.log('Token is', this.token);
    console.log('Header set token is', this.head_obj);
  }
  regis(data: any) {
    return this.http.post(`${this.apiURL}Auth/register`, data);
  }
  login(data: any) {
    return this.http.post(`${this.apiURL}Auth/login`, data);
  }
  postcv(data: any) {
    return this.http.post(`${this.apiURL}Cv/postcv`, data);
  }
  getDatabyid(data: any) {
    console.log(this.head_obj);
    // {headers:this.head_obj}
    return this.http.post(`${this.apiURL}Auth/getdatabyid`, data);
  }
  getDatabyUserId(data: any) {
    return this.http.post(`${this.apiURL}Cv/getdatabyuserid`, data, {
      headers: this.head_obj,
    });
  }
  getResume(data: any) {
    return this.http.post(`${this.apiURL}Cv/getresumedata`, data, {
      headers: this.head_obj,
    });
  }
  isLogin(): boolean {
    const data = localStorage.getItem('token');
    if (!data) {
      return false;
    } else {
      return true;
    }
  }
  getResumeById(data: any) {
    return this.http.post(`${this.apiURL}Cv/getresumedatabyid`, data, {
      headers: this.head_obj,
    });
  }
  updatecv(data: any) {
    return this.http.post(`${this.apiURL}Cv/updatecv`, data, {
      headers: this.head_obj,
    });
  }
  deleteResume(id: any) {
    return this.http.post(`${this.apiURL}Cv/deletecv`, id, {
      headers: this.head_obj,
    });
  }
}
