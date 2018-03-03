import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Computer} from '../model/computer.model';
import {User} from '../model/user.model';
import {RequestOptions} from '@angular/http';
import {Company} from '../model/company.model';


@Injectable()
export class ComputerService {

  private sourceUrl =             'http://127.0.0.1:8080/module-webapp';
  private getComputerUrl =        this.sourceUrl + '/find-a-computer';
  private getAllComputerUrl =     this.sourceUrl + '/find-computer-pagination';
  private performLoginUrl =       this.sourceUrl + '/perform-login';
  private getCountUrl =           this.sourceUrl + '/count-computer';
  private getCompaniesUrl =       this.sourceUrl + '/find-all-companies';
  private postCreateComptuerUrl = this.sourceUrl + '/create-computer';
  private deleteComputerUrl =     this.sourceUrl + '/delete-computer';
  private updateNameUrl =         this.sourceUrl + '/update-name';
  private updateIntroducedUrl =   this.sourceUrl + '/update-introduced';
  private updateDiscontinuedUrl = this.sourceUrl + '/update-discontinued';
  private updateCompanyUrl =      this.sourceUrl + '/update-company';
  private getComputersFilterUrl = this.sourceUrl + '/find-computer-pagination-filter';
  private getCountFilterUrl =     this.sourceUrl + '/count-computer-filter';
  private registerUrl =           this.sourceUrl + '/register-user';
  private createCompanyUrl =      this.sourceUrl + '/create-company';
  private deleteCompanyUrl =      this.sourceUrl + '/delete-company';
  private  isConnected = false;

  constructor(private http: HttpClient) {
  }

  getComputer(id: number): Observable<Computer> {
    let headersGetAComputer = new HttpHeaders();
    headersGetAComputer = headersGetAComputer.set('Content-Type', 'text/plain');
    return this.http.get<Computer>(`${this.getComputerUrl}/${id}`,{withCredentials : true, headers : headersGetAComputer });
  }

  getAllComputer(params): Observable<Computer[]> {
    let headersGetAllComputer = new HttpHeaders();
    headersGetAllComputer = headersGetAllComputer.set('Content-Type', 'text/plain');
    return this.http.get<Computer[]>(`${this.getAllComputerUrl}?order=${params.order}&orderType=${params.orderType}&beginComputerDisplay=${params.beginComputerDisplay}&numberComputerToShow=${params.numberComputerToShow}`,
      {withCredentials : true, headers: headersGetAllComputer});
  }

  getAllComputerFilter(params, filter): Observable<Computer[]> {
    let headersGetAllComputer = new HttpHeaders();
    headersGetAllComputer = headersGetAllComputer.set('Content-Type', 'text/plain');
    return this.http.get<Computer[]>(`${this.getComputersFilterUrl}?order=${params.order}&orderType=${params.orderType}&beginComputerDisplay=${params.beginComputerDisplay}&numberComputerToShow=${params.numberComputerToShow}&filterName=${filter.byName}&filterIntroduced=${filter.byIntroduced}&filterDiscontinued=${filter.byDiscontinued}&filterCompany=${filter.byCompany}`,
      {withCredentials : true, headers: headersGetAllComputer});
  }

  performLogin(user: User):  Promise<void> {
    let headersLogin = new HttpHeaders();
    headersLogin = headersLogin.set('Content-Type', 'text/plain');
    return this.http.post(`${this.performLoginUrl}?username=${user.username}&password=${user.password}`,
      '' , {withCredentials : true, headers : headersLogin})
      .toPromise()
      .then(() => {this.isConnected = true; } )
      .catch((err) => {
        this.isConnected = false;
      });
  }

  getIsConnected(): boolean{
      return this.isConnected;
  }

  getCount(): Observable<any> {
    let headerGetCount = new HttpHeaders();
    headerGetCount = headerGetCount.set('Content-Type', 'text/plain');
    return this.http.get(this.getCountUrl, {withCredentials : true, headers: headerGetCount});
  }

  getCountFilter(filter): Observable<any> {
    let headerGetCount = new HttpHeaders();
    headerGetCount = headerGetCount.set('Content-Type', 'text/plain');
    return this.http.get(`${this.getCountFilterUrl}?filterName=${filter.byName}&filterIntroduced=${filter.byIntroduced}&filterDiscontinued=${filter.byDiscontinued}&filterCompany=${filter.byCompany}`
      , {withCredentials : true, headers: headerGetCount});
  }

  getCompanies(): Observable<any> {
    let headerGetCompanies = new HttpHeaders();
    headerGetCompanies = headerGetCompanies.set('Content-Type', 'text/plain');
    return this.http.get(this.getCompaniesUrl, {withCredentials : true, headers: headerGetCompanies});
  }

  postCreateComputer(computer: Computer): Observable<any> {
    let headerPostCreateComputer = new HttpHeaders();
    headerPostCreateComputer = headerPostCreateComputer.set('Content-Type', 'text/plain');
    return this.http.post(`${this.postCreateComptuerUrl}?name=${computer.name}&introduced=${computer.introduced}&discontinued=${computer.discontinued}&idCompany=${computer.company.id}`,
      '', {withCredentials: true, headers: headerPostCreateComputer});
  }

  deleteComputer(id: string): Observable<any> {
    let headerDeleteComputer = new HttpHeaders();
    headerDeleteComputer = headerDeleteComputer.set('Content-Type', 'text/plain');
    return this.http.delete(`${this.deleteComputerUrl}?id=${id}`, {withCredentials: true, headers: headerDeleteComputer});
  }

  updateName(id: string, name: string): Observable<any> {
    let headerUpdateName = new HttpHeaders();
    headerUpdateName = headerUpdateName.set('Content-Type', 'text/plain');
    return this.http.put(`${this.updateNameUrl}?id=${id}&name=${name}`, '' , {withCredentials: true, headers: headerUpdateName});
  }
  updateIntroduced(id: string, introduced: string): Observable<any> {
    let headerUpdateIntroduced = new HttpHeaders();
    headerUpdateIntroduced = headerUpdateIntroduced.set('Content-Type', 'text/plain');
    return this.http.put(`${this.updateIntroducedUrl}?id=${id}&introduced=${introduced}`, '',
      {withCredentials: true, headers: headerUpdateIntroduced});
  }
  updateDiscontinued(id: string, discontinued: string): Observable<any> {
    let headerUpdateDiscontinued = new HttpHeaders();
    headerUpdateDiscontinued = headerUpdateDiscontinued.set('Content-Type', 'text/plain');
    return this.http.put(`${this.updateDiscontinuedUrl}?id=${id}&discontinued=${discontinued}`, '',
      {withCredentials: true, headers: headerUpdateDiscontinued});
  }
  updateCompany(id: string, companyId: string): Observable<any> {
    let headerUpdateCompany = new HttpHeaders();
    headerUpdateCompany = headerUpdateCompany.set('Content-Type', 'text/plain');
    return this.http.put(`${this.updateCompanyUrl}?id=${id}&idCompany=${companyId}`, '',
      {withCredentials: true, headers: headerUpdateCompany});
  }
  register(user: User): Observable<any> {
    let headerRegister = new HttpHeaders();
    headerRegister = headerRegister.set('Content-Type', 'text/plain');
    return this.http.post(`${this.registerUrl}?username=${user.username}&email=${user.email}&password=${user.password}`, '',
      {withCredentials: true, headers: headerRegister});
  }
  createCompany(companyName: string): Observable<any> {
    let headerCreateCompany = new HttpHeaders();
    headerCreateCompany = headerCreateCompany.set('Content-Type', 'text/plain');
    return this.http.post(`${this.createCompanyUrl}?name=${companyName}`, '',
      {withCredentials: true, headers: headerCreateCompany});
  }
  deleteCompany(id: string): Observable<any> {
    let headerDeleteCompany = new HttpHeaders();
    headerDeleteCompany = headerDeleteCompany.set('Content-Type', 'text/plain');
    return this.http.delete(`${this.deleteCompanyUrl}?id=${id}`,
      {withCredentials: true, headers: headerDeleteCompany});
  }
}
