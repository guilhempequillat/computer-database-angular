import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import { AddComputerComponent } from '../add-computer/add-computer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateComputerComponent } from '../update-computer/update-computer.component';

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DashboardComponent, AddComputerComponent, UpdateComputerComponent],
  providers: [ComputerService]
})
export class DashboardModule { }
