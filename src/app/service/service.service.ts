import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { driver } from '../models/driver';
import { ApiClient } from '../api/api-client';
import { environment } from 'src/environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Credentials } from '../models/credentials';
import { JwtHelperService } from 'angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public active!: Boolean;
  public tokenExpired$: ReplaySubject<any> = new ReplaySubject<any>(1);
  jwtHelper: JwtHelperService = new JwtHelperService ();
  
  constructor(private http:HttpClient, private route:Router, private apiClient: ApiClient) { }

  login(credentials: any):Observable<any>{
    return this.http.post(environment.login, credentials)
    .pipe(tap((res:any) =>{
        this.saveToken(res.access_token);
        this.saveData("__u",res.username);
        this.active=true;
        this.tokenExpired$.next({}); 
      })
    );
  }

  saveToken(token:string){
    if(token!=null){
      localStorage.setItem('auth',token);
      this.active=true;
    }
  }

  saveData(key:string,data:string){
    if(data!=null && key!=null){
      localStorage.setItem(key,data);
    }
  }

  validateTokenLocally(){
    let token = this.getToken ();
    if(token){
      let expired = this.jwtHelper.isTokenExpired (token);
      if(expired == true){
        return true
      } else {
        return false
      }
      // return expired? {expired: true} : {logged: true};
    }else{
      // return {logged: false}
      return true
    }
  }

  getToken():any{
    var token;
    if(token=localStorage.getItem('auth')){
      this.active=true;
      return token;
    }else{
      this.active=false;
      return false;
    }
  }

  logout(toPath="/login"){
    localStorage.removeItem('auth');
    localStorage.removeItem('__u');
    localStorage.removeItem('__r');
    localStorage.removeItem('__e');
    // this.active=false;
    // this.AmISudo$=false;
    this.route.navigate([toPath]);  
  }

  listDrivers() {
   return this.http.get(`${environment.endPoint}${environment.listDrivers}`);
  }

  saveDrivers(driver: any):Observable<any>{
		return this.http.post(`${environment.endPoint}${environment.saveDriver}`, driver);
	}

   deleteDriver(driverId: any):Observable<any>{
		return this.http.get(`${environment.endPoint}${environment.deleteDriver}`+ '?driverId=' + driverId);
	}

  listVehicles() {
    return this.http.get(`${environment.endPoint}${environment.listVehicles}`);
   }

   saveVehicle(vehicle: any):Observable<any>{
		return this.http.post(`${environment.endPoint}${environment.saveVehicle}`, vehicle);
	}

   deleteVehicle(vehicleId: any):Observable<any>{
    return this.http.get(`${environment.endPoint}${environment.deleteVehicle}`+ '?vehicleId=' + vehicleId);
   }

   listRoute() {
    return this.http.get(`${environment.endPoint}${environment.listRoute}`);
   }

   saveRoute(route: any):Observable<any>{
		return this.http.post(`${environment.endPoint}${environment.saveRoute}`, route);
	}

  deleteRoute(routeId: any):Observable<any>{
    return this.http.get(`${environment.endPoint}${environment.deleteRoute}`+ '?routeId=' + routeId);
   }

   listSchedules() {
    return this.http.get(`${environment.endPoint}${environment.listSchedules}`);
   }

   saveSchedule(schedule: any):Observable<any>{
		return this.http.post(`${environment.endPoint}${environment.saveSchedule}`, schedule);
	}

  deleteSchedule(scheduleId: any):Observable<any>{
    return this.http.get(`${environment.endPoint}${environment.deleteSchedule}`+ '?scheduleId=' + scheduleId);
   }
}
