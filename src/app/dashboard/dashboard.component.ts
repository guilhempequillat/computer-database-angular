import { Component, OnInit } from '@angular/core';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private listComputer: Computer[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.getComputers();
  }

  getComputers() {
    this.computerService.getAllComputer().subscribe(
      (listComputer: Computer[]) => {
        this.listComputer = listComputer;
        console.log(listComputer);
      });
  }
}
