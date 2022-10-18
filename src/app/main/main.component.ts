import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { EditComponent } from '../transportation/edit/edit.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    if(this.service.validateTokenLocally() !== false){
      this.router.navigate(['/login']);
    } 
  }




}
