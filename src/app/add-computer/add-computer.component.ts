import {Component, OnInit} from '@angular/core';
import {Company} from '../model/company.model';
import {ComputerService} from '../service/app.service';
import {Computer} from '../model/computer.model';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent implements OnInit {

  private companyList: Company[];
  private computer: Computer;
  private addForm: FormGroup;

  constructor(private router: Router,
              private computerService: ComputerService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCompanies();
    this.computer = new Computer();
    this.computer.company = new Company();
    const pattern = '[\\w\\s./,]{0,}';
    this.addForm = new FormGroup( {
      computerName: new FormControl( '', {
        validators: [
          Validators.required,
          Validators.pattern(pattern)
        ]
      }),
      introduced: new FormControl( '', {
        validators: []
      }),
      discontinued: new FormControl( '', {
        validators: []
      }),
      company: new FormControl( '', {
        validators: []
      })
    });
  }

  loadCompanies() {
    this.computerService.getCompanies().subscribe(
      (listCompanies: Company[]) => {
        this.companyList = listCompanies;
      }
    );
  }

  sumbitForm() {
    if (!this.addForm.invalid && this.verifInput()) {
      this.addComputer();
    } else if ( this.addForm.invalid ) {
      this.openSnackBar('Form inputs are not valid', 'Close', 5000);
    } else {
      this.openSnackBar('Introduced must be before discontinued', 'Close', 5000);
    }
  }

  verifInput(): boolean {
    if (this.addForm.controls.introduced.value !== undefined &&
        this.addForm.controls.introduced.value !== '' &&
        this.addForm.controls.discontinued.value !== undefined &&
        this.addForm.controls.discontinued.value !== '') {
      console.log(this.addForm.controls.introduced.value );
      console.log(this.addForm.controls.discontinued.value );
      console.log(this.getDateValue(this.addForm.controls.introduced.value));
      console.log(this.getDateValue(this.addForm.controls.discontinued.value));
      if (this.getDateValue(this.addForm.controls.introduced.value) >= this.getDateValue(this.addForm.controls.discontinued.value)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  getDateValue(dateString: string): number {
    const introducedArray = dateString.split('-');
    return Number(introducedArray[0]) * 365 + Number(introducedArray[1]) * 31 + Number(introducedArray[2]);
  }
  addComputer() {

    this.computer.name = this.addForm.controls.computerName.value;
    this.computer.introducedString = this.addForm.controls.introduced.value;
    this.computer.discontinuedString = this.addForm.controls.discontinued.value;
    this.computer.company_id = this.addForm.controls.company.value;
    this.computerService.postCreateComputer(this.computer).subscribe(
      (result: any) => {
        console.log(result);
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        if ( error.status === 403 ) {
          this.openSnackBar('You don\'t have the right to add a computer', 'Close', 5000);
        }
        console.log(error);
      }
    );
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  getComputerJson() {
    return JSON.stringify(this.computer);
  }

  updateComputer(id) {
    console.log(id);
    this.router.navigate(['/update-computer/' + id]);
  }
}
