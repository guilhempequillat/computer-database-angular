import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Computer} from '../model/computer.model';
import {RequestOptions} from '@angular/http';


@Injectable()
export class ComputerService {

  private getAComputerUrl = 'http://127.0.0.1:8080/computer-database/find-a-computer';
  private performLoginUrl = 'http://127.0.0.1:8080/computer-database/perform-login?username=t&password=t';
  private body = `username:t
                  password:t`;
  private  isConnected = false;

  constructor(private http: HttpClient){
  }

  getAComputer(id: number): Observable<Computer>{
    let headersGetAComputer = new HttpHeaders();
    headersGetAComputer = headersGetAComputer.set('Content-Type', 'text/plain');
    return this.http.get<Computer>(`${this.getAComputerUrl}/${id}`,{withCredentials : true, headers : headersGetAComputer});
  }

  performLogin(callback: () => void):  Promise<void> {
    let headersLogin = new HttpHeaders();
    headersLogin = headersLogin.set('Content-Type', 'text/plain');
    return this.http.post(this.performLoginUrl, '' , {withCredentials : true, headers : headersLogin}).toPromise()
      .then(() => {
        this.isConnected = true;
      });
  }

  getIsConnected(): boolean{
      return this.isConnected;
  }
}
