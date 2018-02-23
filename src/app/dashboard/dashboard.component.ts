import {Component, OnInit, ViewChildren} from '@angular/core';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private listComputer: Computer[];
  private count: number;
  private deleteMode: boolean;
  private listComputerToDelete: number[];

  private pagination = {
    order: 'ASC',
    orderType: 'name',
    beginComputerDisplay: 0,
    numberComputerToShow: 50,
    userFilter: false
  };
  private navArray = new Array(7);

  constructor(private computerService: ComputerService) {
  }

  ngOnInit() {
    this.getComputers();
    this.getCount();
    this.deleteMode = false;
  }

  changeDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }





  getComputers() {
    if (this.pagination.userFilter) {
      this.getComputerWithFilter();
    } else {
      this.getComputerWithoutFilter();
    }
  }

  getComputerWithFilter() {

  }

  getComputerWithoutFilter() {
    this.computerService.getAllComputer(this.pagination).subscribe(
      (listComputer: Computer[]) => {
        this.listComputer = listComputer;
      });
  }

  getCount() {
    this.computerService.getCount().subscribe(
      (result: any) => {
        this.count = result.count;
        this.navArrayLength();
      }
    );
  }

  changeOrderType(params) {
    if (params === this.pagination.orderType) {
      this.pagination.order = (this.pagination.order === 'ASC') ? 'DESC' : 'ASC';
    } else {
      this.pagination.orderType = params;
    }
    this.getComputers();
  }

  updateNavBar(params) {
    this.pagination.beginComputerDisplay = this.pagination.numberComputerToShow * params;
    this.getComputers();
    this.navArrayLength();
  }

  updateNavBarDecrement() {
    this.pagination.beginComputerDisplay -= this.pagination.numberComputerToShow;
    this.getComputers();

    this.navArrayLength();
  }
  updateNavBarIncrement() {
    this.pagination.beginComputerDisplay += this.pagination.numberComputerToShow;
    this.getComputers()
    this.navArrayLength();
  }

  navArrayLength() {
    console.log(Math.ceil(this.count / this.pagination.numberComputerToShow));
    const courantPage = this.pagination.beginComputerDisplay / this.pagination.numberComputerToShow;
    const nbPagesAfter = Math.ceil(this.count / this.pagination.numberComputerToShow - courantPage);

    const nbSuggestedPagesAfter = nbPagesAfter < 5 ? nbPagesAfter : 5;
    const nbSuggestedPagesBefore = courantPage < 5 ? courantPage : 5;
    const totalLenght = nbSuggestedPagesBefore + nbSuggestedPagesAfter;

    if (nbSuggestedPagesBefore < 5) { //Case at the begining
      const nbSuggestedPagesAfterBegining = nbSuggestedPagesBefore + nbPagesAfter > 10 ? 10 - nbSuggestedPagesBefore : nbPagesAfter;
      this.navArray = new Array(nbSuggestedPagesBefore + nbSuggestedPagesAfterBegining);
      for (let i = 0; i < this.navArray.length; i++) {
        this.navArray[i] = i + courantPage - nbSuggestedPagesBefore;
      }
    } else if ( nbSuggestedPagesAfter < 5 ) {//Case at the end
      const nbSuggestedPagesBeforeEnd = nbSuggestedPagesAfter + courantPage > 10 ? 10 - nbSuggestedPagesAfter : courantPage;
      this.navArray = new Array(nbSuggestedPagesAfter + nbSuggestedPagesBeforeEnd);
      for (let i = 0; i < this.navArray.length; i++) {
        this.navArray[i] = i + courantPage - nbSuggestedPagesBeforeEnd;
      }
    }
    else {//Case at the middle
      this.navArray = new Array(totalLenght);
      for (let i = 0; i < this.navArray.length; i++) {
        this.navArray[i] = i + courantPage - nbSuggestedPagesBefore;
      }
    }
  }
}
