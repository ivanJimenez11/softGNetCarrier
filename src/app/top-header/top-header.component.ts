import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
  }

  logout(){
    this.service.logout();
  }

  list(){
    this.router.navigate(["list"]);
  }

  add(){
    this.router.navigate(["add"]);
  }

  edit(){
    this.router.navigate(["edit"]);
  }
}
