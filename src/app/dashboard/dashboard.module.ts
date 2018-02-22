import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import { AddComputerComponent } from '../add-computer/add-computer.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [DashboardComponent, AddComputerComponent],
  providers: [ComputerService]
})
export class DashboardModule { }
