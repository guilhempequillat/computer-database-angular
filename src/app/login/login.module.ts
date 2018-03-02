import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShowErrorComponent} from '../show-error/show-error.component';


@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent,ShowErrorComponent],
  providers: [ComputerService]
})
export class LoginModule { }
