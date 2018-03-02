import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {Company} from '../model/company.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
              private router: Router) { }

  ngOnInit() {
    this.updateForm = new FormGroup({
      name :  new FormControl({
        validators: [Validators.required]
      }),
      introduced : new FormControl({
        validators: [Validators.pattern('')]
      }),
      discontinued : new FormControl({
        validators: [Validators.required]
      }),
      companyId : new FormControl({
        validators: [Validators.required]
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

      console.log(computer);
      console.log(this.updateForm.value.companyId);
      console.log(typeof(this.updateForm.value.companyId));
    });
  }

  loadCompanies() {
    this.computerSerivce.getCompanies().subscribe((companies: Company[]) => {
      this.listCompany = companies;
    });
  }

  onSubmit() {
    if (typeof(this.updateForm.value.name) === 'string') {
      this.computerSerivce.updateName(this.id, this.updateForm.value.name).subscribe((response: any) => {
        this.router.navigate(['dashboard']);
      });
    }
    if (typeof(this.updateForm.value.introduced) === 'string') {
      this.computerSerivce.updateIntroduced(this.id, this.updateForm.value.introduced).subscribe( (response: any) => {
        this.router.navigate(['dashboard']);
      });
    }
    if (typeof(this.updateForm.value.discontinued) === 'string') {
      this.computerSerivce.updateDiscontinued(this.id, this.updateForm.value.discontinued).subscribe(( response: any) => {
        this.router.navigate(['dashboard']);
      });
    }
    if (typeof(this.updateForm.value.companyId) === 'string') {
      this.computerSerivce.updateCompany(this.id, this.updateForm.value.companyId).subscribe(( response: any) => {
        this.router.navigate(['dashboard']);
      });
    }
  }
}
