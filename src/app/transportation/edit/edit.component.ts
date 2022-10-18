import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { driver } from 'src/app/models/driver';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  textHeader?: string;
  dataDriver?: driver;
  formDriver = new FormGroup({
    lastName : new FormControl('', [Validators.required]),
    firstName : new FormControl('', [Validators.required]),
    ssd : new FormControl(''),
    dob : new FormControl(''),
    address : new FormControl(''),
    city : new FormControl(''),
    zip : new FormControl(''),
    phone : new FormControl('', [Validators.required]),
    activeDriver : new FormControl('')
  });
   activeDriver: boolean = false;

  constructor(private service: ServiceService, public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog) {
        this.textHeader = data.textHeader;
        if(data.objectDriver !== null && data.objectDriver !== undefined){
          this.dataDriver = data.objectDriver;
          this.formDriver.get('lastName')?.setValue(this.dataDriver?.lastName);
          this.formDriver.get('firstName')?.setValue(this.dataDriver?.firstName);
          this.formDriver.get('ssd')?.setValue(this.dataDriver?.ssd);
          this.formDriver.get('dob')?.setValue(this.dataDriver?.dob);
          this.formDriver.get('address')?.setValue(this.dataDriver?.address);
          this.formDriver.get('city')?.setValue(this.dataDriver?.city);
          this.formDriver.get('zip')?.setValue(this.dataDriver?.zip);
          this.formDriver.get('phone')?.setValue(this.dataDriver?.phone)
          this.formDriver.get('activeDriver')?.setValue(this.dataDriver?.active);
        }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formDriver.valid){
        if(this.dataDriver !== undefined && this.dataDriver !== null && this.dataDriver.id){
          this.dataDriver = {
            id : this.dataDriver.id,
            lastName : this.formDriver.get('lastName')?.value,
            firstName : this.formDriver.get('firstName')?.value,
            ssd : this.formDriver.get('ssd')?.value,
            dob : this.formDriver.get('dob')?.value,
            address : this.formDriver.get('address')?.value,
            city : this.formDriver.get('city')?.value,
            zip : this.formDriver.get('zip')?.value,
            phone : this.formDriver.get('phone')?.value,
            active : this.formDriver.get('activeDriver')?.value,
           }
        } else {
          this.dataDriver = {
            id : null,
            lastName : this.formDriver.get('lastName')?.value,
            firstName : this.formDriver.get('firstName')?.value,
            ssd : this.formDriver.get('ssd')?.value,
            dob : this.formDriver.get('dob')?.value,
            address : this.formDriver.get('address')?.value,
            city : this.formDriver.get('city')?.value,
            zip : this.formDriver.get('zip')?.value,
            phone : this.formDriver.get('phone')?.value,
            active : this.formDriver.get('activeDriver')?.value,
           }
        }
      this.service.saveDrivers(this.dataDriver).subscribe(
        (data: any) => {
          this.dataDriver = data;
           if(this.dataDriver?.id){
            alert("Save Driver.");
           } else {
            alert("Driver No saved.");
           }
        },
        err => {
          console.log("Error")
        }
      ); 
    }
  }

}
