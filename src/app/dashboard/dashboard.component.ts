import {Component, OnInit, ViewChildren} from '@angular/core';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private listComputer: Computer[];
  private count: number;
  private deleteMode: boolean;
  private listComputerToDelete: string[];

  private pagination = {
    order: 'ASC',
    orderType: 'name',
    beginComputerDisplay: 0,
    numberComputerToShow: 50,
    userFilter: false
  };
  private filter = {
    byName: '',
    byIntroduced: '',
    byDiscontinued: '',
    byCompany: ''
  };
  private navArray = new Array(7);

  constructor(private computerService: ComputerService,
              private router: Router) {
  }

  ngOnInit() {
    this.getComputers();

    this.deleteMode = false;
    this.filter = {
      byName: '',
      byIntroduced: '',
      byDiscontinued: '',
      byCompany: ''
    };
  }

  changeDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  getComputerIdToDelete() {
    const computerInput = new Array();
    for (let i = 0 ; i < document.getElementsByName('computerToRemove').length ; i++){
      computerInput.push(document.getElementsByName('computerToRemove')[i]);
    };
    this.listComputerToDelete = computerInput.filter(com => com.checked)
      .map(com => com.value);
    console.log(this.listComputerToDelete);
  }

  confirmDelete() {
    this.listComputerToDelete.map(id => this.computerService.deleteComputer(id)
      .subscribe((response: any) => {
        this.ngOnInit();
    }, (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          console.error(error.status);
        }
      }));
  }


  getComputers() {
    if (this.pagination.userFilter) {
      this.getCountFilter();
      this.getComputerWithFilter();
    } else {
      this.getCount();
      this.getComputerWithoutFilter();
    }
  }

  getComputerWithFilter() {
    console.log(this.filter);
    this.computerService.getAllComputerFilter(this.pagination, this.filter).subscribe(
      (listComputer: Computer[]) => {
        this.listComputer = listComputer;
      }, (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          console.error(error.status);
        }
      });
  }

  getComputerWithoutFilter() {
    this.computerService.getAllComputer(this.pagination).subscribe(
      (listComputer: Computer[]) => {
        this.listComputer = listComputer;
      }, (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          console.error(error.status);
        }
      });
  }

  getCount() {
    this.computerService.getCount().subscribe(
      (result: any) => {
        this.count = result.count;
        this.navArrayLength();
      }, (error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/dashboard']);
          console.error(error.status);
        }
      }
    );
  }

  getCountFilter() {
    this.computerService.getCountFilter(this.filter).subscribe(
      (result: any) => {
        console.log(result);
        this.count = result;
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
    this.getComputers();
    this.navArrayLength();
  }

  navArrayLength() {
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
    } else {//Case at the middle
      this.navArray = new Array(totalLenght);
      for (let i = 0; i < this.navArray.length; i++) {
        this.navArray[i] = i + courantPage - nbSuggestedPagesBefore;
      }
    }
  }

  updateComputer(id: string) {
    console.log(id);
    this.router.navigate(['/update-computer/' + id]);
  }

  updateNbComputerToShow(nbComputer) {
    this.pagination.numberComputerToShow = nbComputer;
    this.pagination.beginComputerDisplay = 0;
    this.getComputers();
    this.navArrayLength();
  }

  toggleUseFilter() {
    this.pagination.userFilter = !this.pagination.userFilter;
  }

  applyFilter() {
    this.pagination.beginComputerDisplay = 0;
    this.getComputers();
    this.navArrayLength();
  }

}
