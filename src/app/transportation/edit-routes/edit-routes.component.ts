import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { route } from 'src/app/models/route';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-routes',
  templateUrl: './edit-routes.component.html',
  styleUrls: ['./edit-routes.component.scss']
})
export class EditRoutesComponent implements OnInit {

  textHeader?: string;
  dataRoute?: route;
  formRoute = new FormGroup({
    description : new FormControl('', [Validators.required]),
    driverRoute : new FormControl('', [Validators.required]),
    vehicleRoute : new FormControl('', [Validators.required]),
    activeRoute : new FormControl('')
  });
   activeRoute: boolean = false;
  dataDriver: any;
  dataVehicle: any;

  constructor(private service: ServiceService, public dialogRef: MatDialogRef<EditRoutesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog) {
        this.textHeader = data.textHeader;
        if(data.objectRoute !== null && data.objectRoute !== undefined){
          this.dataRoute = data.objectRoute;
          this.formRoute.get('description')?.setValue(this.dataRoute?.description);
          this.formRoute.get('driverRoute')?.setValue(this.dataRoute?.drivers.id);
          this.formRoute.get('vehicleRoute')?.setValue(this.dataRoute?.vehicles.id);
          this.formRoute.get('activeRoute')?.setValue(this.dataRoute?.active);
        }
      }

  ngOnInit(): void {
    this.listDrivers();
    this.listVehiclesAll();
  }

  listVehiclesAll(){
    this.service.listVehicles().subscribe(
      (data: any) => {
          this.dataVehicle = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  listDrivers(){
    this.service.listDrivers().subscribe(
      (data: any) => {
          this.dataDriver = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  onSubmit(){
    if(this.formRoute.valid){
      let sendRoute: any;
        if(this.dataRoute !== undefined && this.dataRoute !== null && this.dataRoute.id){
          sendRoute = {
            id : this.dataRoute.id,
            description : this.formRoute.get('description')?.value,
            drivers : {id : this.formRoute.get('driverRoute')?.value},
            vehicles : {id: this.formRoute.get('vehicleRoute')?.value},
            active : this.formRoute.get('activeRoute')?.value
           }
        } else {
          sendRoute = {
            id : null,
            description : this.formRoute.get('description')?.value,
            drivers : {id: this.formRoute.get('driverRoute')?.value},
            vehicles : {id: this.formRoute.get('vehicleRoute')?.value},
            active : this.formRoute.get('activeRoute')?.value
           }
        }
      this.service.saveRoute(sendRoute).subscribe(
        (data: any) => {
          this.dataRoute = data;
           if(this.dataRoute?.id){
            alert("Route Saved.");
           } else {
            alert("Route No saved.");
           }
        },
        err => {
          console.log("Error")
        }
      ); 
    }
  }

}
