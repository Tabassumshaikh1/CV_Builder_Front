import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import jsPDF from 'jspdf';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecv',
  templateUrl: './updatecv.component.html',
  styleUrls: ['./updatecv.component.css'],
})
export class UpdatecvComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  id: any;
  public submit = false;
  public userid: any;
  public data: any;
  dynamicValues: any[] = [];
  dynamicValues1: any[] = [];
  dynamicValues2: any[] = [];
  project: any[] = [];
  productForm: FormGroup;
  public skills = [];
  public educationobj = {
    courseName: '',
    universityName: '',
    collegeName: '',
    percentage: '',
    edcFromdate: '',
    edcTodate: '',
  };
  public educationobj1 = {
    courseName: '',
    universityName: '',
    collegeName: '',
    percentage: '',
    edcFromdate: '',
    edcTodate: '',
  };
  public educationobj2 = {
    courseName: '',
    universityName: '',
    collegeName: '',
    percentage: '',
    edcFromdate: '',
    edcTodate: '',
  };
  public educationdata: any;
  public expobj1 = {
    current_ctc: '',
    current_position: '',
    expected_ctc: '',
    fromDate: '',
    joining_location: '',
    organisationName: '',
    technologies: '',
    toDate: '',
  };
  public expobj2 = {
    current_ctc: '',
    current_position: '',
    expected_ctc: '',
    fromDate: '',
    joining_location: '',
    organisationName: '',
    technologies: '',
    toDate: '',
  };
  public expobj3 = {
    current_ctc: '',
    current_position: '',
    expected_ctc: '',
    fromDate: '',
    joining_location: '',
    organisationName: '',
    technologies: '',
    toDate: '',
  };
  public projobj1 = {
    duration: '',
    fromDate: '',
    project_description: '',
    project_technology: '',
    project_title: '',
    team_size: '',
    toDate: '',
  };
  public projobj2 = {
    duration: '',
    fromDate: '',
    project_description: '',
    project_technology: '',
    project_title: '',
    team_size: '',
    toDate: '',
  };
  public projobj3 = {
    duration: '',
    fromDate: '',
    project_description: '',
    project_technology: '',
    project_title: '',
    team_size: '',
    toDate: '',
  };
  public education: any[] = [];
  public educationdatas: any[] = [];
  public experiencedata: any[] = [];
  public projectdata: any[] = [];
  public experience: any[] = [];
  public personaldata: any;
  public social = [];
  public allUpdatedData: any = [];
  public formData: any;
  public formobj: any;
  public status = false;
  ratings = [];
  name: any;
  constructor(
    private router: ActivatedRoute,
    private ser: UserService,

    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.ser.getResumeById({ id: this.id }).subscribe((res) => {
      this.formData = res;
      console.log('FormData is', this.formData);
      if (res) {
        this.status = true;
        this.formobj = this.formData[0];
        console.log('Form Object is', this.formobj);
        this.educationdata = this.formobj.education;
        for (let ele of this.formobj.education) {
          console.log('For', ele.courseName);
        }
        console.log('AAAA', this.formobj.education);
      }
    });
  }

  myForm = new FormGroup({
    firstname: new FormControl(``, [
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
    id: new FormControl(),
  });

  get fdata() {
    return this.myForm.controls;
  }

  updateData() {
    this.myForm.value.id = this.id;

    this.personaldata = this.myForm.value;
    console.log('All Data is ', this.personaldata);
  }

  makePdf() {
    this.name = this.formData[0].firstname + ' ' + this.formData[0].lastname;
    console.log('name is', this.name);
    let pdf = new jsPDF('p', 'mm', [900, 950]);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save(`${this.name} Resume`);
      },
    });
  }
  addDynamicInput() {
    for (let u of this.formobj.education) {
      this.dynamicValues.push(u.courseName);
      this.dynamicValues.push(u.universityName);
      this.dynamicValues.push(u.collegeName);
      this.dynamicValues.push(u.percentage);
      this.dynamicValues.push(u.edcFromdate);
      this.dynamicValues.push(u.edcTodate);
    }
  }
  addDynamicInput1() {
    for (let u of this.formobj.experience) {
      this.dynamicValues1.push(u.current_ctc);
      this.dynamicValues1.push(u.current_position);
      this.dynamicValues1.push(u.expected_ctc);
      this.dynamicValues1.push(u.fromDate);
      this.dynamicValues1.push(u.joining_location);
      this.dynamicValues1.push(u.organisationName);
      this.dynamicValues1.push(u.technologies);
      this.dynamicValues1.push(u.toDate);
    }
  }
  addDynamicInput2() {
    for (let u of this.formobj.project) {
      this.dynamicValues2.push(u.duration);
      this.dynamicValues2.push(u.fromDate);
      this.dynamicValues2.push(u.project_description);
      this.dynamicValues2.push(u.project_technology);
      this.dynamicValues2.push(u.project_title);
      this.dynamicValues2.push(u.team_size);
      this.dynamicValues2.push(u.toDate);
    }
  }

  removeDynamicInput(index: number) {
    this.dynamicValues.splice(index, 1);
  }
  removeDynamicInput1(index: number) {
    this.dynamicValues1.splice(index, 1);
  }
  removeDynamicInput2(index: number) {
    this.dynamicValues1.splice(index, 1);
  }
  submitData() {
    this.dynamicValues.forEach((ele, ind) => {
      if (ind < 6) {
        if (ind == 0) {
          this.educationobj.courseName = ele;
        } else if (ind == 1) {
          this.educationobj.universityName = ele;
        } else if (ind == 2) {
          this.educationobj.collegeName = ele;
        } else if (ind == 3) {
          this.educationobj.percentage = ele;
        } else if (ind == 4) {
          this.educationobj.edcFromdate = ele;
        } else if (ind == 5) {
          this.educationobj.edcTodate = ele;
        }
      }
      if (ind > 5 && ind < 12) {
        if (ind == 6) {
          this.educationobj1.courseName = ele;
        } else if (ind == 7) {
          this.educationobj1.universityName = ele;
        } else if (ind == 8) {
          this.educationobj1.collegeName = ele;
        } else if (ind == 9) {
          this.educationobj1.percentage = ele;
        } else if (ind == 10) {
          this.educationobj1.edcFromdate = ele;
        } else if (ind == 11) {
          this.educationobj1.edcTodate = ele;
        }
      }
      if (ind > 11 && ind < 18) {
        if (ind == 12) {
          this.educationobj2.courseName = ele;
        } else if (ind == 13) {
          this.educationobj2.universityName = ele;
        } else if (ind == 14) {
          this.educationobj2.collegeName = ele;
        } else if (ind == 15) {
          this.educationobj2.percentage = ele;
        } else if (ind == 16) {
          this.educationobj2.edcFromdate = ele;
        } else if (ind == 17) {
          this.educationobj2.edcTodate = ele;
        }
      }
    });

    this.educationdatas.push(this.educationobj);
    this.educationdatas.push(this.educationobj1);
    this.educationdatas.push(this.educationobj2);

    console.log('Edc', this.education);
    // -------------------------
    if (this.educationdatas.length != 0) {
      for (let u of this.educationdatas) {
        if (u.courseName === '' || null) {
          continue;
        } else {
          this.education.push(u);
        }
      }
      console.log('New', this.education);
    }
  }
  expData() {
    console.log('dynamicValues array is', this.dynamicValues1);

    this.dynamicValues1.forEach((ele, ind) => {
      if (ind < 8) {
        if (ind == 0) {
          this.expobj1.current_ctc = ele;
        } else if (ind == 1) {
          this.expobj1.current_position = ele;
        } else if (ind == 2) {
          this.expobj1.expected_ctc = ele;
        } else if (ind == 3) {
          this.expobj1.fromDate = ele;
        } else if (ind == 4) {
          this.expobj1.joining_location = ele;
        } else if (ind == 5) {
          this.expobj1.organisationName = ele;
        } else if (ind == 6) {
          this.expobj1.technologies = ele;
        } else if (ind == 7) {
          this.expobj1.toDate = ele;
        }
      }
      if (ind > 7 && ind < 15) {
        if (ind == 8) {
          this.expobj2.current_ctc = ele;
        } else if (ind == 9) {
          this.expobj2.current_position = ele;
        } else if (ind == 10) {
          this.expobj2.expected_ctc = ele;
        } else if (ind == 11) {
          this.expobj2.fromDate = ele;
        } else if (ind == 12) {
          this.expobj2.joining_location = ele;
        } else if (ind == 13) {
          this.expobj2.organisationName = ele;
        } else if (ind == 14) {
          this.expobj2.technologies = ele;
        } else if (ind == 15) {
          this.expobj2.toDate = ele;
        }
      }
      if (ind > 15 && ind < 24) {
        if (ind == 16) {
          this.expobj3.current_ctc = ele;
        } else if (ind == 17) {
          this.expobj3.current_position = ele;
        } else if (ind == 18) {
          this.expobj3.expected_ctc = ele;
        } else if (ind == 19) {
          this.expobj3.fromDate = ele;
        } else if (ind == 20) {
          this.expobj3.joining_location = ele;
        } else if (ind == 21) {
          this.expobj3.organisationName = ele;
        } else if (ind == 22) {
          this.expobj3.technologies = ele;
        } else if (ind == 23) {
          this.expobj3.toDate = ele;
        }
      }
    });

    this.experiencedata.push(this.expobj1);

    this.experiencedata.push(this.expobj2);

    this.experiencedata.push(this.expobj3);
    if (this.experiencedata.length != 0) {
      for (let u of this.experiencedata) {
        if (u.current_ctc === '' || null) {
          continue;
        } else {
          this.experience.push(u);
        }
      }
      console.log('New', this.experience);
    }

    console.log('Final is', this.experience);
  }
  prjData() {
    this.dynamicValues2.forEach((ele, ind) => {
      if (ind < 8) {
        if (ind == 0) {
          this.projobj1.duration = ele;
        } else if (ind == 1) {
          this.projobj1.fromDate = ele;
        } else if (ind == 2) {
          this.projobj1.project_description = ele;
        } else if (ind == 3) {
          this.projobj1.fromDate = ele;
        } else if (ind == 4) {
          this.projobj1.project_technology = ele;
        } else if (ind == 5) {
          this.projobj1.project_title = ele;
        } else if (ind == 6) {
          this.projobj1.team_size = ele;
        } else if (ind == 7) {
          this.projobj1.toDate = ele;
        }
      }
      if (ind > 7 && ind < 16) {
        if (ind == 8) {
          this.projobj2.duration = ele;
        } else if (ind == 9) {
          this.projobj2.fromDate = ele;
        } else if (ind == 10) {
          this.projobj2.project_description = ele;
        } else if (ind == 11) {
          this.projobj2.fromDate = ele;
        } else if (ind == 12) {
          this.projobj2.project_technology = ele;
        } else if (ind == 13) {
          this.projobj2.project_title = ele;
        } else if (ind == 14) {
          this.projobj2.team_size = ele;
        } else if (ind == 15) {
          this.projobj2.toDate = ele;
        }
      }
      if (ind > 15 && ind < 24) {
        if (ind == 16) {
          this.projobj3.duration = ele;
        } else if (ind == 17) {
          this.projobj3.fromDate = ele;
        } else if (ind == 18) {
          this.projobj3.project_description = ele;
        } else if (ind == 19) {
          this.projobj3.fromDate = ele;
        } else if (ind == 20) {
          this.projobj3.project_technology = ele;
        } else if (ind == 21) {
          this.projobj3.project_title = ele;
        } else if (ind == 22) {
          this.projobj3.team_size = ele;
        } else if (ind == 23) {
          this.projobj3.toDate = ele;
        }
      }
    });

    this.projectdata.push(this.projobj1);

    this.projectdata.push(this.projobj2);

    this.projectdata.push(this.projobj3);
    if (this.projectdata.length != 0) {
      for (let u of this.projectdata) {
        if (u.duration === '' || null) {
          continue;
        } else {
          this.project.push(u);
        }
      }
    }
  }
  updateAllData() {
    this.allUpdatedData.push(this.personaldata);
    this.allUpdatedData.push(this.education);
    this.allUpdatedData.push(this.experience);
    this.allUpdatedData.push(this.project);
    console.log('DDDDDDDDDDDDD', this.allUpdatedData);

    this.ser.updatecv(this.allUpdatedData).subscribe((res: any) => {
      Swal.fire(`${res.msg}`, '', 'success').then(() => {
        this.ser.getResumeById({ id: this.id }).subscribe((res) => {
          this.formData = res;

          if (res) {
            this.status = true;
            this.formobj = this.formData[0];
          }
        });
      });
    });
  }
}
