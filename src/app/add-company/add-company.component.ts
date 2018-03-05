import {Component, OnInit} from '@angular/core';
import {ComputerService} from '../service/app.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  private companyName: string;
  private companyForm: FormGroup;
  constructor(private computerService: ComputerService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.companyName = '';
    const pattern = '[\\w\\s]{0,15}';
    this.companyForm = new FormGroup({
      companyNameIn: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(pattern)
        ]
      })
    });
  }


  createCompany() {
    if (!this.companyForm.invalid){
      this.computerService.createCompany(this.companyName).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      }, (error: any) => {
        if (error.status === 403) {
          this.openSnackBar('You don\'t have the right to add a company', 'Close', 5000);
        } else {
          this.openSnackBar('An error occurred', 'Close', 5000);
        }
      });
    } else {
      this.openSnackBar('Form inputs are not valid', 'Close', 5000);
    }
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }
}
