import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public userid: any;
  public data: any;
  public data1: any;
  constructor(
    private ser: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.data1 = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('User id is', this.data1._id);
    this.ser.getDatabyUserId({ id: this.data1._id }).subscribe((res: any) => {
      this.data = res;
      console.log('data', this.data);
    });
  }

  myresume() {
    this.router.navigate([`myresume`]);
  }
  viewresume(id: any) {
    this.router.navigate([`viewresume/${id}`]);
  }
  updateresume(id: any) {
    this.router.navigate([`update/${id}`]);
  }
  deleteresume(id: any) {
    this.ser.deleteResume({ id: id }).subscribe((res: any) => {
      console.log(res);
      if (res) {
        Swal.fire(`${res.msg}`, '', 'success').then(() => {
          this.data1 = JSON.parse(localStorage.getItem('userdata') || '{}');

          console.log('User id is', this.data1._id);
          this.ser
            .getDatabyUserId({ id: this.data1._id })
            .subscribe((res: any) => {
              this.data = res;
            });
        });
      }
    });
  }
}
