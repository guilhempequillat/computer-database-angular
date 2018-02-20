import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Computer} from '../model/computer.model';
import {User} from '../model/user.model';
import {RequestOptions} from '@angular/http';


@Injectable()
export class ComputerService {

  private getAComputerUrl =   'http://127.0.0.1:8080/computer-database/find-a-computer';
  private getAllComputerUrl = 'http://127.0.0.1:8080/computer-database/find-computer-pagination';
  private performLoginUrl =   'http://127.0.0.1:8080/computer-database/perform-login';
  private getCountUrl =          'http://127.0.0.1:8080/computer-database/count-computer';
  private  isConnected = false;

  constructor(private http: HttpClient) {
  }

  getAComputer(id: number): Observable<Computer> {
    let headersGetAComputer = new HttpHeaders();
    headersGetAComputer = headersGetAComputer.set('Content-Type', 'text/plain');
    return this.http.get<Computer>(`${this.getAComputerUrl}/${id}`,{withCredentials : true, headers : headersGetAComputer });
  }

  getAllComputer(params): Observable<Computer[]> {
    let headersGetAllComputer = new HttpHeaders();
    headersGetAllComputer = headersGetAllComputer.set('Content-Type', 'text/plain');

    return this.http.get<Computer[]>(`${this.getAllComputerUrl}?order=${params.order}&orderType=${params.orderType}&beginComputerDisplay=${params.beginComputerDisplay}&numberComputerToShow=${params.numberComputerToShow}`,
      {withCredentials : true, headers: headersGetAllComputer});
  }

  performLogin(user: User):  Promise<void> {
    let headersLogin = new HttpHeaders();
    headersLogin = headersLogin.set('Content-Type', 'text/plain');
    return this.http
      .post(`${this.performLoginUrl}?username=${user.username}&password=${user.password}`, '' , {withCredentials : true, headers : headersLogin})
      .toPromise()
      .then(() => {this.isConnected = true; } );
  }

  getIsConnected(): boolean{
      return this.isConnected;
  }

  getCount(): Observable<any> {
    let headerGetCount = new HttpHeaders();
    headerGetCount = headerGetCount.set('Content-Type', 'text/plain');
    return this.http.get(this.getCountUrl, {withCredentials : true, headers: headerGetCount});
  }
}
