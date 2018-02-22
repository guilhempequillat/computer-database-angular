import { Component, OnInit } from '@angular/core';
import {Company} from '../model/company.model';
import {ComputerService} from '../service/app.service';
import {Computer} from '../model/computer.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent implements OnInit {

  private companyList: Company[];
  private computer: Computer;

  constructor(private router: Router,
              private computerService: ComputerService) { }

  ngOnInit() {
    this.loadCompanies();
    this.computer = new Computer();
    this.computer.company = new Company();
  }

  loadCompanies() {
    this.computerService.getCompanies().subscribe(
      (listCompanies: Company[]) => {
        this.companyList = listCompanies;
      }
    );
  }

  sumbitForm() {
    if(this.verifInput()) {
      this.addComputer();
    } else {
      //TODO
    }
  }

  verifInput() : boolean{
    //TODO
    return true;
  }

  addComputer() {
    console.log(this.computer);
    this.computerService.postCreateComputer(this.computer).subscribe(
      (result : any) => {
        console.log(result);
        this.router.navigate(['/dashboard']);
      }
    )
  }

  getComputerJson() {
    return JSON.stringify(this.computer);
  }
}
