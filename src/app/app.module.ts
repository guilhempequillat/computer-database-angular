import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';


import { AppComponent } from './app.component';
import { ComputerService } from './computer.service';
import {HttpClientModule} from '@angular/common/http';
import {Computer} from '../model/computer.model';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ComputerService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
