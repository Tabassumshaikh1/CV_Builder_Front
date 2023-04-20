import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css'],
})
export class ViewResumeComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  userid: any;
  data: any;
  ratings = [];
  name: any;
  constructor(private router: ActivatedRoute, private ser: UserService) {}
  ngOnInit(): void {
    this.userid = this.router.snapshot.paramMap.get('id');
    this.ser.getResume({ id: this.userid }).subscribe((res: any) => {
      console.log('Res', res);
      this.data = res;
      console.log('Data is', this.data);
    });
  }

  makePdf() {
    this.name = this.data[0].firstname + ' ' + this.data[0].lastname;
    console.log('name is', this.name);
    let pdf = new jsPDF('p', 'mm', [900, 1000]);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save(`${this.name} Resume`);
      },
    });
  }
}
