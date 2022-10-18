import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

declare let window: any;

@Injectable()
export class ApiClient {
   
  // SECURITY_HEADER = 'Authorization';
  // TOKEN_STORAGE_KEY = 'token';
  // message;
  oppUsu: any[] = [];
//   jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}
  

//   createAuthorizationHeader(removeType: boolean = false) {
//     const tokenStr: string = this.getToken();
//     const token: string = tokenStr ? `Bearer ${tokenStr}` : 'noUser';

//     httpOptions.headers = new HttpHeaders(removeType ? undefined : { 'Content-Type': 'application/json' });
//     httpOptions.headers = httpOptions.headers.append('Authorization', token);
//     httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   }


  get =  (url:any, successHandler: any, errorHandler:any, validarToken: boolean = true) => {
   
    url = `${environment.endPoint}${url}`;
    // this.createAuthorizationHeader();
    this.http.get(url, httpOptions).subscribe(result => {
      successHandler( result);
    }, error => errorHandler(error)
    );
  }

  post = (url: any, data: any, successHandler:any, errorHandler:any, removeContentType: boolean = false) => {
    
    url = `${environment.endPoint}${url}`;
    // this.createAuthorizationHeader(removeContentType);

    this.http.post(url, data, httpOptions).subscribe(result => {
      successHandler(result);
    }, error => errorHandler(error)
    );
  }
}
  
