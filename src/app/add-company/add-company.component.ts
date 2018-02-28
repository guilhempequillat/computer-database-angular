import { Component, OnInit } from '@angular/core';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  private companyName: string;

  constructor(private computerService: ComputerService,
              private router: Router) { }

  ngOnInit() {
    this.companyName = '';
  }

  createCompany() {
    if (this.companyName.length > 3) {
      this.computerService.createCompany(this.companyName).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
