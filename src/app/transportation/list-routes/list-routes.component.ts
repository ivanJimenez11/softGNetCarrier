import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { EditRoutesComponent } from '../edit-routes/edit-routes.component';

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.scss']
})
export class ListRoutesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'description', 'driverRoute', 'vehicleRoute', 'active', 'actions'];
  dataSource : any;
  value = 'Clear me';
  textHeader? : string;
  selectedRowIndex: any;

  constructor(private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    if(this.service.validateTokenLocally() !== false){
      this.router.navigate(['/login']);
    }
    this.listRouteAll();
  }

  highlight(row: any) {
    this.selectedRowIndex = row; 
  }

  listRouteAll(){
    this.service.listRoute().subscribe(
      (data: any) => {
          this.dataSource = data;
      },
      err => {
        console.log("Error")
      }
    ); 
  }

  deleteRoute(routeId: any){
    this.service.deleteRoute(routeId).subscribe(
      (data: any) => { 
          if((data.status == 200)){
            this.listRouteAll();
            alert("Route Deleted");
           } 
      },
      err => {
        if(err.status == 200){
          this.listRouteAll();
          alert("Route Save");
        } else {
          alert("Route Delete");
        }
      
      }
    ); 
  }

  openDialog(object: any, labelTitel: string): void {
    const dialogRef = this.dialog.open(EditRoutesComponent, {
      width: '50%',
      disableClose: true,
      data: {
        objectRoute : object,
        textHeader : labelTitel
      }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      this.listRouteAll();
    }); 
}

}
