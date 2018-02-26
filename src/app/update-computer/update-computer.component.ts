import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Computer} from '../model/computer.model';
import {ComputerService} from '../service/app.service';

@Component({
  selector: 'app-update-computer',
  templateUrl: './update-computer.component.html',
  styleUrls: ['./update-computer.component.css']
})
export class UpdateComputerComponent implements OnInit {

  private id: string;
  private computer: Computer;

  constructor(private route: ActivatedRoute,
              private computerSerivce: ComputerService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadComputerToUpdate(this.route.snapshot.paramMap.get('id'));
  }

  loadComputerToUpdate(id) {
    this.computerSerivce.getAComputer(id).subscribe((computer: Computer) => {
      console.log(computer);
    });
  }

}
