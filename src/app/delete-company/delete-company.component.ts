import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../service/app.service';
import {Company} from '../model/company.model';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  private listCompany: Company[];
  private idCompany: string;

  constructor(private computerService: ComputerService,
              private router: Router) { }

  ngOnInit() {
    this.idCompany = '-1';
    this.loadCompany();
  }

  loadCompany() {
    this.computerService.getCompanies().subscribe((listCompany : Company[]) => {
      this.listCompany = listCompany;
    });
  }
  deleteCompany() {
    if (this.idCompany != -1) {
      this.computerService.deleteCompany(this.idCompany).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
