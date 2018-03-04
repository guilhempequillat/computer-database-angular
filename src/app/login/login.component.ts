import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormControl} from '@angular/forms';

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
  private registerForm: FormGroup;

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
      usernameLogin: new FormControl('',{
         validators: [
            Validators.required,
            Validators.minLength(5)]
        }
      ),
      passwordLogin: new FormControl('',{
        validators: [
            Validators.required,
            Validators.minLength(5)
        ],
      })
    });

    const pattern = '\\w{0,15}';

    this.registerForm = new FormGroup( {
      usernameRegister: new FormControl( '', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(pattern)
        ]
      }),
      emailRegister: new FormControl( '', {
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
      passwordRegister: new FormControl( '', {
        validators: [
            Validators.required,
            Validators.pattern(pattern)
        ]
      }),
      confirmPasswordRegister: new FormControl( '', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  performLogin() {
    console.log(this.loginForm.invalid);
    if(!this.loginForm.invalid){
      this.user.username = this.loginForm.controls.usernameLogin.value;
      this.user.password = this.loginForm.controls.passwordLogin.value;
      console.log(this.user);
      this.computerService.performLogin(this.user)
        .then(() => this.callbackLogin());
      console.log(this.computerService.getIsConnected());
    }
  }

  callbackLogin(): void {
    console.log(this.computerService.getIsConnected());
    if (this.computerService.getIsConnected()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loadAComputer(id: number) {
    this.computerService.getComputer(id).subscribe(
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
    if(!this.registerForm.invalid && this.registerForm.controls.passwordRegister.value === this.registerForm.controls.confirmPasswordRegister.value){

      this.registerUserCreation();

      this.computerService.register(this.user).subscribe((response: any) => {
        console.log(response);
        this.loginMode = true;
      }, (error: any) {
        console.error(error);
      });
    }else if(this.registerForm.controls.passwordRegister.value != this.registerForm.controls.confirmPasswordRegister.value){
      console.log("Password confirmation not valide");
    } else {
      console.log("Form not valid");
    }

  }

  registerUserCreation() {
    this.user.email = this.registerForm.controls.emailRegister.value;
    this.user.password = this.registerForm.controls.passwordRegister.value;
    this.user.username = this.registerForm.controls.usernameRegister.value;
  }
}
