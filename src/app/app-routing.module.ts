import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginModule} from './login/login.module';
import {LoginComponent} from './login/login.component';
import {AddComputerComponent} from './add-computer/add-computer.component';
import {UpdateComputerComponent} from './update-computer/update-computer.component';
import {DeleteCompanyComponent} from './delete-company/delete-company.component';
import {AddCompanyComponent} from './add-company/add-company.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-computer',
    component: AddComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'update-computer/:id',
    component: UpdateComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'delete-company',
    component: DeleteCompanyComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-company',
    component: AddCompanyComponent,
    pathMatch: 'full'
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    DashboardModule,
    LoginModule
  ],
  declarations: []
})
export class AppRoutingModule { }
