import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { vehicle } from 'src/app/models/vehicle';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.scss']
})

export class EditVehiclesComponent implements OnInit {
  textHeader?: string;
  dataVehicle?: vehicle;
  formVehicle = new FormGroup({
    description : new FormControl('', [Validators.required]),
    year : new FormControl('', [Validators.required]),
    make : new FormControl(''),
    capacity : new FormControl(''),
    activeVehicle : new FormControl('')
  });
   activeDriver: boolean = false;

   constructor(private service: ServiceService, public dialogRef: MatDialogRef<EditVehiclesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog) {
        this.textHeader = data.textHeader;
        if(data.objectVehicle !== null && data.objectVehicle !== undefined){
          this.dataVehicle = data.objectVehicle;
          this.formVehicle.get('description')?.setValue(this.dataVehicle?.description);
          this.formVehicle.get('year')?.setValue(this.dataVehicle?.year);
          this.formVehicle.get('make')?.setValue(this.dataVehicle?.make);
          this.formVehicle.get('capacity')?.setValue(this.dataVehicle?.capacity);
          this.formVehicle.get('activeVehicle')?.setValue(this.dataVehicle?.active);
        }
      }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formVehicle.valid){
        if(this.dataVehicle !== undefined && this.dataVehicle !== null && this.dataVehicle.id){
          this.dataVehicle = {
            id : this.dataVehicle.id,
            description : this.formVehicle.get('description')?.value,
            year : this.formVehicle.get('year')?.value,
            make : this.formVehicle.get('make')?.value,
            capacity : this.formVehicle.get('capacity')?.value,
            active : this.formVehicle.get('activeVehicle')?.value,
           }
        } else {
          this.dataVehicle = {
            id : null,
            description : this.formVehicle.get('description')?.value,
            year : this.formVehicle.get('year')?.value,
            make : this.formVehicle.get('make')?.value,
            capacity : this.formVehicle.get('capacity')?.value,
            active : this.formVehicle.get('activeVehicle')?.value,
           }
        }
      this.service.saveVehicle(this.dataVehicle).subscribe(
        (data: any) => {
          this.dataVehicle = data;
           if(this.dataVehicle?.id){
            alert("Vehicle Saved.");
           } else {
            alert("Vehicle No saved.");
           }
        },
        err => {
          console.log("Error")
        }
      ); 
    }
  }

}
