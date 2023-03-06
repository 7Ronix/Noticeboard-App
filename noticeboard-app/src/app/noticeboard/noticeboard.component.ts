import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NoticeboardModel } from './noticeboard.model';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {

  formValue !: FormGroup;
  adminModelObj: NoticeboardModel = new NoticeboardModel();
  userData !: any;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      notice: [''],
    })
    this.getAllUser();

  }

  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    })
  }

  postUserDetails(){
    this.adminModelObj.firstName = this.formValue.value.firstName;
    this.adminModelObj.lastName = this.formValue.value.lastName;
    this.adminModelObj.notice = this.formValue.value.notice;

    this.api.postUser(this.adminModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User Added Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err=>{
      alert("Something Went Wrong!");
    })

  }
  onEdit(row : any){
    this.adminModelObj.id = row.id; 
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['notice'].setValue(row.notice);
  }

  updateUserDetails(){
    this.adminModelObj.firstName = this.formValue.value.firstName;
    this.adminModelObj.lastName = this.formValue.value.lastName;
    this.adminModelObj.notice = this.formValue.value.notice;

    this.api.updateUser(this.adminModelObj,this.adminModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }






}
