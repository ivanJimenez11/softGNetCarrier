import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'ssd', 'dob', 'address', 'city', 'zip', 'phone', 'active', 'actions'];
  dataSource : any;
  value = 'Clear me';
  textHeader? : string;
  selectedRowIndex: any;

  constructor(private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    this.listDrivers();
    // console.log(localStorage.getItem('auth'))
    // localStorage.getItem('auth')
    if(this.service.validateTokenLocally() !== false){
      this.router.navigate(['/login']);
    } 
  }

  highlight(row: any) {
    this.selectedRowIndex = row; 
  }
  
  listDrivers(){
    this.service.listDrivers().subscribe(
      (data: any) => {
          this.dataSource = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  deleteDriver(driverId: any){
    this.service.deleteDriver(driverId).subscribe(
      (data: any) => { 
          if((data.status == 200)){
            this.listDrivers();
            alert("Driver Deleted");
           } 
      },
      err => {
        if(err.status == 200){
          this.listDrivers();
          alert("Delete Save");
        } else {
          alert("Error Delete");
        }
      
      }
    ); 
  }

  openDialog(object: any, labelTitel: string): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '50%',
      disableClose: true,
      data: {
        objectDriver : object,
        textHeader : labelTitel
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.listDrivers();
    }); 
}
}
