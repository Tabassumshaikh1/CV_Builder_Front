import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public submit = false;
  public cat!: '';
  public data!: '';
  public users: any;
  public area: any;
  public token: any;
  public userid: any;
  public userdata: any;

  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),

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
    confirmpass: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}'
      ),
    ]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[6-9][0-9]{9}'),
    ]),
    // role: new FormControl('', [Validators.required]),
  });

  constructor(private ser: UserService, private router: Router) {}
  ngOnInit(): void {}
  get fdata() {
    return this.myForm.controls;
  }

  postData() {
    this.submit = true;
    if (this.myForm.invalid) {
      return;
    }
    this.ser.regis(this.myForm.value).subscribe((res: any) => {
      console.log('Res is', res);

      Swal.fire(`${res.msg}`, '', 'success');
    });
  }
  LoginNavigate() {
    this.router.navigate(['/login']);
  }
}
