import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {Company} from '../model/company.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-computer',
  templateUrl: './update-computer.component.html',
  styleUrls: ['./update-computer.component.css']
})
export class UpdateComputerComponent implements OnInit {

  private updateForm: FormGroup;
  private id: string;
  private computer: Computer;
  private listCompany: Company[];
  private introduced: string;
  private discontinued: string;
  constructor(private route: ActivatedRoute,
              private computerSerivce: ComputerService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const pattern = '[\\w\\s./,]{0,}';
    this.updateForm = new FormGroup({
      name:  new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(pattern)
        ]
      }),
      introduced: new FormControl('', {
        validators: [
        ]
      }),
      discontinued : new FormControl('', {
        validators: [
        ]
      }),
      companyId : new FormControl( '', {
        validators: [
        ]
      })
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadComputerToUpdate(this.route.snapshot.paramMap.get('id'));
    this.loadCompanies();

  }

  loadComputerToUpdate(id) {
    this.computerSerivce.getComputer(id).subscribe((computer: Computer) => {
      this.computer = computer;
      if (this.computer.introduced != null) {
        const introducedMonth = this.computer.introduced.monthValue < 10 ?
          `0${this.computer.introduced.monthValue}` : `${this.computer.introduced.monthValue}`;
        const introducedDay = this.computer.introduced.dayOfMonth < 10 ?
          `0${this.computer.introduced.dayOfMonth}` : `${this.computer.introduced.dayOfMonth}`;
        this.introduced = this.computer.introduced.year + '-' +
          introducedMonth + '-' +
          introducedDay;
      }
      if (this.computer.discontinued != null) {
        const discontinuedMonth = this.computer.discontinued.monthValue < 10 ?
          '0' + this.computer.discontinued.monthValue : this.computer.discontinued.monthValue;
        const discontinuedDay = this.computer.discontinued.dayOfMonth < 10 ?
          '0' + this.computer.discontinued.dayOfMonth : this.computer.discontinued.dayOfMonth;
        this.discontinued = this.computer.discontinued.year + '-' +
          discontinuedMonth + '-' +
          discontinuedDay;
      }
      this.updateForm.controls.companyId.setValue('' + this.computer.company_id);
      this.updateForm.controls.name.setValue('' + this.computer.name);
      this.updateForm.controls.introduced.setValue('' + this.introduced);
      this.updateForm.controls.discontinued.setValue('' + this.discontinued);
      console.log(computer);
      console.log(this.updateForm.value.companyId);
      console.log(typeof(this.updateForm.value.companyId));
    });
  }

  checkInput(): boolean {
    if (this.updateForm.controls.introduced.value !== undefined &&
      this.updateForm.controls.introduced.value !== '' &&
      this.updateForm.controls.discontinued.value !== undefined &&
      this.updateForm.controls.discontinued.value !== '') {
      if (this.getDateValue(this.updateForm.controls.introduced.value) >= this.getDateValue(this.updateForm.controls.discontinued.value)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  loadCompanies() {
    this.computerSerivce.getCompanies().subscribe((companies: Company[]) => {
      this.listCompany = companies;
    });
  }

  onSubmit() {
    if (!this.updateForm.invalid && this.checkInput()) {
      if (typeof(this.updateForm.value.name) === 'string') {
        this.computerSerivce.updateName(this.id, this.updateForm.value.name).subscribe((response: any) => {
          this.router.navigate(['dashboard']);
        }, (error: any) => {
          if (error.status === 403) {
            this.openSnackBar('You don\'t have the right to add a computer', 'Close', 5000);
          }
        });
      }
      if (typeof(this.updateForm.value.introduced) === 'string') {
        this.computerSerivce.updateIntroduced(this.id, this.updateForm.value.introduced).subscribe( (response: any) => {
          this.router.navigate(['dashboard']);
        }, (error: any) => {
          if (error.status === 403) {
            this.openSnackBar('You don\'t have the right to add a computer', 'Close', 5000);
          }
          });
      }
      if (typeof(this.updateForm.value.discontinued) === 'string') {
        this.computerSerivce.updateDiscontinued(this.id, this.updateForm.value.discontinued).subscribe(( response: any) => {
          this.router.navigate(['dashboard']);
        }, (error: any) => {
          if (error.status === 403) {
            this.openSnackBar('You don\'t have the right to add a computer', 'Close', 5000);
          }
        });
      }
      if (typeof(this.updateForm.value.companyId) === 'string') {
        this.computerSerivce.updateCompany(this.id, this.updateForm.value.companyId).subscribe(( response: any) => {
          this.router.navigate(['dashboard']);
        }, (error: any) => {
          if (error.status === 403) {
            this.openSnackBar('You don\'t have the right to update a computer', 'Close', 5000);
          }
        });
      }
    } else if (this.updateForm.invalid) {
      this.openSnackBar('Form inputs are not valid', 'Close', 5000);
    } else {
      this.openSnackBar('Introduced must be before discontinued', 'Close', 5000);
    }
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  getDateValue(dateString: string): number {
    const introducedArray = dateString.split('-');
    return Number(introducedArray[0]) * 365 + Number(introducedArray[1]) * 31 + Number(introducedArray[2]);
  }
}
