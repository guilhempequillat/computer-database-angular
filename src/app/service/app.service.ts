import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Computer} from '../model/computer.model';
import {User} from '../model/user.model';
import {RequestOptions} from '@angular/http';
import {Company} from '../model/company.model';


@Injectable()
export class ComputerService {

  private getAComputerUrl =       'http://127.0.0.1:8080/computer-database/find-a-computer';
  private getAllComputerUrl =     'http://127.0.0.1:8080/computer-database/find-computer-pagination';
  private performLoginUrl =       'http://127.0.0.1:8080/computer-database/perform-login';
  private getCountUrl =           'http://127.0.0.1:8080/computer-database/count-computer';
  private getCompaniesUrl =       'http://127.0.0.1:8080/computer-database/find-all-companies';
  private postCreateComptuerUrl = 'http://127.0.0.1:8080/computer-database/create-computer';
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

  getCompanies(): Observable<Company[]> {
    let headerGetCompanies = new HttpHeaders();
    headerGetCompanies = headerGetCompanies.set('Content-Type', 'text/plain');
    return this.http.get(this.getCompaniesUrl, {withCredentials : true, headers: headerGetCompanies});
  }

  postCreateComputer(computer: Computer): Observable<any> {
    let headerPostCreateComputer = new HttpHeaders();
    headerPostCreateComputer = headerPostCreateComputer.set('Content-Type', 'test/plain');
    console.log('Company id : '+ computer.company.id);
    return this.http.post(`${this.postCreateComptuerUrl}?name=${computer.name}&introduced=${computer.introduced}&discontinued=${computer.discontinued}&idCompany=${computer.company.id}`,
      '', {withCredentials: true, headers: headerPostCreateComputer});
  }
}
