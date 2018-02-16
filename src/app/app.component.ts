import {Component, OnInit} from '@angular/core';
import {Computer} from '../model/computer.model';
import {ComputerService} from './computer.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private computer: Computer;

  constructor(private computerService: ComputerService) {
    console.log('Test constructor');
    this.loadAComputer(20);
  }

  ngOnInit() {
    console.log('Test ngOnInit');
    this.loadAComputer(20);
  }

  sendRequest(){
    this.loadAComputer(20);
  }

  performLogin() {
    this.computerService.performLogin(this.callback).then(() => this.callback());
    console.log(this.computerService.getIsConnected());
  }

  public callback(): void {
    console.log(this.computerService.getIsConnected());
  }

  loadAComputer(id: number) {
    this.computerService.getAComputer(id).subscribe(
      (computer: Computer) => {
        this.computer = computer;
        console.log(computer);
        console.log(document.cookie);

        console.log('Request done');
      }
    );
  }

}
