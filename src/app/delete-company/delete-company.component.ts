import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../service/app.service';
import {Company} from '../model/company.model';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  private listCompany: Company[];
  private idCompany: string;

  constructor(private computerService: ComputerService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.idCompany = '-1';
    this.loadCompany();
  }

  loadCompany() {
    this.computerService.getCompanies().subscribe((listCompany: Company[]) => {
      this.listCompany = listCompany;
    });
  }
  deleteCompany() {
    if (this.idCompany !== '-1') {
      this.computerService.deleteCompany(this.idCompany).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      },
        (error: any) => {
          if (error.status === 403) {
            this.openSnackBar('You don\'t have the right to add a company', 'Close', 5000);
          } else {
            this.openSnackBar('An error occurred', 'Close', 5000);
          }
        });
    }
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }
}
