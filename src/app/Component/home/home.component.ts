import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private ser: UserService) {}
  islogin: any;
  ngOnInit(): void {
    this.islogin = this.ser.isLogin();
    console.log('Login Status', this.islogin);
  }
}
