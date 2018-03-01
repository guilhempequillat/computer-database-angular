import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ComputerService } from './service/app.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {HeaderModule} from './header/header.module';
import { ShowErrorComponent } from './show-error/show-error.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HeaderModule
  ],
  providers: [ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
