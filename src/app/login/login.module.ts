import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [LoginComponent],
  providers: [ComputerService]
})
export class LoginModule { }
