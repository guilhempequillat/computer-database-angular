import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {ActivatedRoute, Route, Router, RouterLink, RouterModule} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private computer: Computer;
  private user: User;
  private loginMode: boolean;
  private verifPassword: string;
  private loginForm: FormGroup;

  constructor(private computerService: ComputerService,
              private router: Router) {}

  ngOnInit() {
    this.loadAComputer(20);
    this.loginMode = true;
    this.user = new User();
    this.user.username = '';
    this.user.password = '';
    this.user.email = '';
    this.verifPassword = '';

    this.loginForm = new FormGroup({
      usernameLogin: new FormControl(),
      passwordLogin: new FormControl()
    });
    console.log(this.loginForm.controls.usernameLogin.value);
  }

  performLogin() {
    this.user.username = this.loginForm.controls.usernameLogin.value;
    this.user.password = this.loginForm.controls.passwordLogin.value;
    console.log(this.user);
    this.computerService.performLogin(this.user)
      .then(() => this.callbackLogin());
    console.log(this.computerService.getIsConnected());
  }

  callbackLogin(): void {
    console.log(this.computerService.getIsConnected());
    if (this.computerService.getIsConnected()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loadAComputer(id: number) {
    this.computerService.getAComputer(id).subscribe(
      (computer: Computer) => {
        this.computer = computer;
        console.log(computer);
        console.log('Request done');
      }, (err) => {
        console.log(err.status);
      }
    );
  }
  onSubmit() {
    this.performLogin();
  }
  loginModeChange() {
    this.loginMode = true;
  }
  registerModeChange() {
    this.loginMode = false;
  }
  onSubmitRegister() {
    this.computerService.register(this.user).subscribe((response: any) => {
      console.log(response);
      this.loginMode = true;
    });
  }
  verifPasswordChange() {
    const inputRePassword = document.getElementById('repassword');
    if (this.user.password === this.verifPassword) {
      console.log('same');
      inputRePassword.classList.remove('ng-invalid');
      inputRePassword.classList.add('ng-valid');
    } else {
      inputRePassword.classList.add('ng-invalid');
      inputRePassword.classList.remove('ng-valid');
    }
  }
}
