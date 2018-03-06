import {Component, OnInit} from '@angular/core';
import {ComputerService} from '../service/app.service';
import {User} from '../model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private showLogout: boolean;

  constructor(private computerService: ComputerService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    console.log(this.router.routerState.snapshot.url);
    const fakeUser = new User();
    fakeUser.username = 'x';
    fakeUser.password = 'x';
    this.computerService.performLogin(fakeUser).then((resonse: any) => {
      this.router.navigate(['/login']);
    });
  }
}
