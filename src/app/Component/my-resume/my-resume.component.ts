import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.css'],
})
export class MyResumeComponent implements OnInit {
  public submit = false;
  public userid: any;
  public data: any;
  productForm1: FormGroup;
  productForm: FormGroup;
  educationDetails: FormGroup;
  projectDetails: FormGroup;
  experienceDetails: FormGroup;
  public skills = [];
  public alldata: any;
  public social = [];
  public education = [];
  public project = [];
  public experience = [];
  public localStoragedata: any;
  constructor(
    private ser: UserService,
    private router: Router,
    private fb: FormBuilder //It is used to create form group and form control
  ) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    this.productForm1 = this.fb.group({
      sociallink: this.fb.array([]),
    });
    this.educationDetails = this.fb.group({
      edc: this.fb.array([]),
    });
    this.experienceDetails = this.fb.group({
      exp: this.fb.array([]),
    });
    this.projectDetails = this.fb.group({
      prjct: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.localStoragedata = localStorage.getItem('userdata');
    this.data = JSON.parse(this.localStoragedata);
    console.log('Data is', this.data._id);
    this.userid = this.data._id;
  }
  myForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    lastname: new FormControl('', [
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
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('[6-9][0-9]{9}'),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
    ]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+$'),
    ]),
    summary: new FormControl('', [Validators.required]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-Z0-9 .,#;:'-]{1,1000}"),
    ]),
    uid: new FormControl(),
  });
  get fdata() {
    return this.myForm.controls;
  }
  //Dynamically Fields For SKills
  quantities(): FormArray {
    return this.productForm.get('quantities') as FormArray;
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      skillname: '',
      ratings: '',
    });
  }
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  onSubmit() {
    console.log(this.productForm.value.quantities);
    this.skills = this.productForm.value.quantities;
    if (this.skills.length !== 0) {
      Swal.fire('Skills Addeed Successfully', '', 'success');
    } else {
      Swal.fire('Invalid Data', '', 'warning');
    }
  }
  postData() {
    if (this.myForm.invalid) {
      console.log('Invalid');
      Swal.fire('All Fields Are Required', '', 'warning');
      return;
    }

    this.myForm.value.uid = this.userid;
    console.log('Inside Postdata', this.myForm.value);
    this.alldata = this.myForm.value;
    this.alldata.skills = this.skills;
    this.alldata.social = this.social;
    this.alldata.education = this.education;
    this.alldata.experience = this.experience;
    this.alldata.project = this.project;
    console.log('My Form Value is', this.alldata);
    this.ser.postcv(this.myForm.value).subscribe((res: any) => {
      Swal.fire(`${res.msg}`, '', 'success');
    });
  }
  // =====================
  sociallink(): FormArray {
    return this.productForm1.get('sociallink') as FormArray;
  }
  newQuantity1(): FormGroup {
    return this.fb.group({
      medianame: '',
      link: '',
    });
  }
  addQuantity1() {
    this.sociallink().push(this.newQuantity1());
    console.log('Inside Addqrty1', this.sociallink);
  }
  removeQuantity1(i: number) {
    this.sociallink().removeAt(i);
  }
  // ======Education
  edc(): FormArray {
    return this.educationDetails.get('edc') as FormArray;
  }
  newEdc(): FormGroup {
    return this.fb.group({
      courseName: '',
      universityName: '',
      collegeName: '',
      percentage: '',
      edcFromdate: '',
      edcTodate: '',
    });
  }
  addEducation() {
    this.edc().push(this.newEdc());
  }
  removeEducation(i: number) {
    this.edc().removeAt(i);
  }
  edcSubmit() {
    console.log('EdcDet', this.educationDetails.value);
    this.education = this.educationDetails.value.edc;
    if (this.education.length != 0) {
      Swal.fire('Education Details Addeed Successfully', '', 'success');
    } else {
      Swal.fire('Invalid Data', '', 'warning');
    }
  }
  // Exp Details
  exp(): FormArray {
    return this.experienceDetails.get('exp') as FormArray;
  }
  newExp(): FormGroup {
    return this.fb.group({
      organisationName: '',
      joining_location: '',
      current_position: '',
      current_ctc: '',
      expected_ctc: '',
      fromDate: '',
      toDate: '',
      technologies: '',
    });
  }
  addExp() {
    this.exp().push(this.newExp());
  }
  removeExp(i: number) {
    this.exp().removeAt(i);
  }
  expSubmit() {
    this.experience = this.experienceDetails.value.exp;
    if (this.experience.length !== 0) {
      Swal.fire('Experience Addeed Successfully', '', 'success');
    } else {
      Swal.fire('Invalid Data', '', 'warning');
    }
  }
  //======================Project
  prjct(): FormArray {
    return this.projectDetails.get('prjct') as FormArray;
  }
  newPrjct(): FormGroup {
    return this.fb.group({
      project_title: '',
      duration: '',
      team_size: '',
      project_technology: '',
      project_description: '',
      fromDate: '',
      toDate: '',
    });
  }
  addPrjct() {
    this.prjct().push(this.newPrjct());
  }
  removePrjct(i: number) {
    this.prjct().removeAt(i);
  }
  prjctSubmit() {
    this.project = this.projectDetails.value.prjct;
    if (this.project.length != 0) {
      Swal.fire('Project Details Addeed Successfully', '', 'success');
    } else {
      Swal.fire('Invalid Data', '', 'warning');
    }
  }
  onSubmit1() {
    this.social = this.productForm1.value.sociallink;
    console.log('Social array', this.social);
    if (this.social.length !== 0) {
      Swal.fire('Links added Successfully!', '', 'success');
    } else {
      Swal.fire('Invalid Data', '', 'warning');
    }
  }
  backbtn() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(() => {
          this.router.navigate(['/userdash']);
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info').then(() => {
          this.router.navigate(['/userdash']);
        });
      }
    });
  }
}
