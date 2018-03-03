import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import { AddComputerComponent } from '../add-computer/add-computer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateComputerComponent } from '../update-computer/update-computer.component';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';
import { AddCompanyComponent } from '../add-company/add-company.component';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule,
  MatTableModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../material/material.module';

@NgModule({
  exports: [RouterModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [DashboardComponent, AddComputerComponent, UpdateComputerComponent, DeleteCompanyComponent, AddCompanyComponent],
  providers: [ComputerService]
})
export class DashboardModule { }
