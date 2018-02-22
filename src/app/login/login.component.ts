import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {ActivatedRoute, Route, Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private computer: Computer;
  private user: User;

  constructor(private computerService: ComputerService,
              private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    console.log('Test ngOnInit');
    this.loadAComputer(20);
    this.user = new User();
    this.user.username = "" ;
    this.user.password = "" ;
  }

  sendRequest() {
    this.loadAComputer(20);
  }

  performLogin() {
    this.computerService.performLogin(this.user).then(() => this.callbackLogin());
    console.log(this.computerService.getIsConnected());
  }

  public callbackLogin(): void {
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
      }
    );
  }
  onSubmit() {
    this.performLogin();
  }
}
