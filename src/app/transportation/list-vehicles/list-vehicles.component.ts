import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { EditVehiclesComponent } from '../edit-vehicles/edit-vehicles.component';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'description', 'year', 'make', 'capacity', 'active', 'actions'];
  dataSource : any;
  value = 'Clear me';
  textHeader? : string;
  selectedRowIndex: any;

  constructor(private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    if(this.service.validateTokenLocally() !== false){
      this.router.navigate(['/login']);
    } 
    this.listVehiclesAll();
  }

  highlight(row: any) {
    this.selectedRowIndex = row; 
  }
  
  listVehiclesAll(){
    this.service.listVehicles().subscribe(
      (data: any) => {
          this.dataSource = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  deleteVehicle(vehicleId: any){
    this.service.deleteVehicle(vehicleId).subscribe(
      (data: any) => { 
          if((data.status == 200)){
            this.listVehiclesAll();
            alert("Vehicle Deleted");
           } 
      },
      err => {
        if(err.status == 200){
          this.listVehiclesAll();
          alert("Delete Save");
        } else {
          alert("Error Delete");
        }
      
      }
    ); 
  }

  openDialog(object: any, labelTitel: string): void {
    const dialogRef = this.dialog.open(EditVehiclesComponent, {
      width: '50%',
      disableClose: true,
      data: {
        objectVehicle : object,
        textHeader : labelTitel
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.listVehiclesAll();
    }); 
}

}
