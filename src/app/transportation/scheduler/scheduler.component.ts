import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { EditSchedulerComponent } from '../edit-scheduler/edit-scheduler.component';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  dataSchedules: any;
  value = 'Clear me';
  selectRow: any;

  constructor(private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    if(this.service.validateTokenLocally() !== false){
      this.router.navigate(['/login']);
    } 
    this.listSchedulesAll();
  }

  listSchedulesAll(){
    this.service.listSchedules().subscribe(
      (data: any) => {
          this.dataSchedules = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  highlight(row: any){
    this.selectRow = row;
  }

  deleteSchedule(scheduleId: any){
    this.service.deleteSchedule(scheduleId).subscribe(
      (data: any) => { 
          if((data.status == 200)){
            this.listSchedulesAll();
            alert("Schedule Deleted");
           } 
      },
      err => {
        if(err.status == 200){
          this.listSchedulesAll();
          alert("Delete Save");
        } else {
          alert("Error Delete");
        }
      
      }
    ); 
  }

  openDialog(object: any, labelTitel: string): void {
    const dialogRef = this.dialog.open(EditSchedulerComponent, {
      width: '50%',
      disableClose: true,
      data: {
        objectSchedule : object,
        textHeader : labelTitel
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.listSchedulesAll();
    }); 
}

}
