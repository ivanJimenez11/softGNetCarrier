import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { Credentials } from '../models/credentials';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin = new FormGroup({
    loginUser : new FormControl('', [Validators.required]),
    loginPassword : new FormControl('', [Validators.required],),
  });
  hide = true;
  loginCredentials?: Credentials;
  http: any;

  constructor(private router: Router, private service: ServiceService , private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
   
  onSubmit(){
    if(this.formularioLogin.valid){ 
      const body = new HttpParams()
      .set('username', this.formularioLogin.get('loginUser')?.value)
      .set('password', this.formularioLogin.get('loginPassword')?.value);
      // this.loginCredentials = {
      //   username: this.formularioLogin.get('loginUser')?.value,
      //   password: this.formularioLogin.get('loginPassword')?.value
      // }
        let authobs = this.service.login(body);
        authobs.subscribe((response : any) =>{
        if(response){
          this.router.navigate(["/main"])
        } else {
          this.openSnackBarAccesYes();
        }
        
      },(error: any) =>{
        this.openSnackBarAccesYes();
        console.log("error "+error);
      });
  }
  }


  navigatee(){
    this.router.navigate(["/main"]);
  }

  openSnackBarAccesYes() {
    this._snackBar.open('Access Denied.', 'Ok');
  }
  

}
