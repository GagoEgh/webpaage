import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { TrainingsComponent } from './trainings.component';


@NgModule({
  declarations: [
    TrainingsComponent
  ],
  imports: [
    CommonModule,
    TrainingsRoutingModule
  ]
})
export class TrainingsModule { }
