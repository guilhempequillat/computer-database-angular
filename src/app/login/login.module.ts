import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {ComputerService} from '../service/app.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '../app.module';
import {ShowErrorComponent} from '../show-error/show-error.component';
import {MaterialModule} from './../material/material.module';
import {MatButtonModule, MatCardModule, MatInput, MatInputModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  exports: [RouterModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    ShowErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  declarations: [LoginComponent, ShowErrorComponent],
  providers: [ComputerService]
})
export class LoginModule { }
