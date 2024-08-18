import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGameRoutingModule } from './form-game-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { FormGameComponent } from './form-game.component';


@NgModule({
  declarations: [FormGameComponent],
  imports: [
    CommonModule,
    FormGameRoutingModule,
    ButtonModule,
    RippleModule,
    InputNumberModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  exports: [FormGameComponent]
})
export class FormGameModule { }
