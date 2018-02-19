import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [DashboardComponent],
  providers: [ComputerService]
})
export class DashboardModule { }
