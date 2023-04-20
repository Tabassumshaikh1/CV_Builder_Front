import { Component, ViewChild, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  islogin: any;
  userdata: any;

  constructor(private router: Router, private ser: UserService) {}
  ngOnInit(): void {
    this.userlogin();

    this.userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
  }

  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  value: any;
  selectedValue: any;

  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }
  userlogin() {
    this.islogin = this.ser.isLogin();
    console.log('Login Status', this.islogin);
  }
  onCancel() {
    this.value = undefined;
    this.ddTrigger.closeMenu();
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
