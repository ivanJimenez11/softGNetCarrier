import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-scheduler',
  templateUrl: './edit-scheduler.component.html',
  styleUrls: ['./edit-scheduler.component.scss']
})
export class EditSchedulerComponent implements OnInit {
  dataSchedule: any;
  textHeader?: string;
  idSchedule: any;
  idRoute: any;
  week: any;
  from: any;
  to: any;
  active: any;

  constructor(private service: ServiceService, public dialogRef: MatDialogRef<EditSchedulerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog) {
        this.textHeader = data.textHeader;
        if(data.objectSchedule !== null && data.objectSchedule !== undefined){
          this.dataSchedule = data.objectSchedule;
          this.idSchedule = this.dataSchedule.id;
          this.idRoute = this.dataSchedule.route.id;
          this.week = this.dataSchedule.weekNum;
          this.from = this.dataSchedule.from;
          this.to = this.dataSchedule.to;
          this.active = this.dataSchedule.active;
        }
      }

  ngOnInit(): void {
    this.listRouteAll();
  }

  listRouteAll(){
    this.service.listRoute().subscribe(
      (data: any) => {
          this.dataSchedule = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  Submit(){
      let sendSchedule: any;
        if(this.idSchedule !== undefined && this.idSchedule !== null){
          sendSchedule = {
            id : this.idSchedule,
            route : {id: this.idRoute},
            weekNum : this.week,
            from : this.from,
            to: this.to,
            active : this.active
           }
        } else {
          sendSchedule = {
            id : null,
            route : {id: this.idRoute},
            weekNum : this.week,
            from : this.from,
            to: this.to,
            active : this.active
           }
        }
      this.service.saveSchedule(sendSchedule).subscribe(
        (data: any) => {
          this.dataSchedule = data;
           if(this.dataSchedule?.id){
            alert("Schedule Saved.");
           } else {
            alert("Schedule No saved.");
           }
        },
        err => {
          console.log("Error")
        }
      ); 
  }

}
