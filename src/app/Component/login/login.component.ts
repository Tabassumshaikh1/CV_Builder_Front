import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public submit = false;
  public localStoragedata: any;
  public token: any;
  public userid: any;
  public userdata: any;

  constructor(private router: Router, private ser: UserService) {
    //
  }
  ngOnInit(): void {}
  myForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*"
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}'
      ),
    ]),
  });
  get fdata() {
    return this.myForm.controls;
  }

  postData() {
    this.submit = true;
    if (this.myForm.invalid) {
      return;
    }
    console.log('Form Val is', this.myForm.value);
    this.ser.login(this.myForm.value).subscribe((res: any) => {
      if (res.err === 0) {
        Swal.fire(`${res.msg}`, '', 'success').then(() => {
          this.token = res.token;
          this.userid = res.id;
          localStorage.setItem('token', res.token);
          console.log('user id is', this.userid);
          this.ser.getDatabyid({ id: this.userid }).subscribe((res: any) => {
            this.userdata = res.data;

            localStorage.setItem('userdata', JSON.stringify(this.userdata[0]));

            this.router.navigate(['/userdash']).then(() => {
              window.location.reload();
            });
          });
        });
      } else {
        Swal.fire(`${res.msg}`, '', 'warning');
      }
    });
  }
  LoginNavigate() {
    this.router.navigate(['/regis']);
  }
}
