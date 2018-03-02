import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    MatToolbarModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: []
})
export class MaterialModule { }
