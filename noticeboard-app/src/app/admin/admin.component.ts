import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AdminModel } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formValue !: FormGroup;
  adminModelObj : AdminModel = new AdminModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) {}


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      notice : [''],
    })
    this.getAllUser();
  
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postUserDetails(){
    this.adminModelObj.firstName = this.formValue.value.firstName;
    this.adminModelObj.lastName = this.formValue.value.lastName;
    this.adminModelObj.email = this.formValue.value.email;
    this.adminModelObj.mobile = this.formValue.value.mobile;
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
  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    })
  }
  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("User Deleted");
      this.getAllUser();
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.adminModelObj.id = row.id; 
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['notice'].setValue(row.notice);
  }
  updateUserDetails(){
    this.adminModelObj.firstName = this.formValue.value.firstName;
    this.adminModelObj.lastName = this.formValue.value.lastName;
    this.adminModelObj.email = this.formValue.value.email;
    this.adminModelObj.mobile = this.formValue.value.mobile;
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
