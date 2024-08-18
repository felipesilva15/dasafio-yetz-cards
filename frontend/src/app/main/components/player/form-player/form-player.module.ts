import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPlayerRoutingModule } from './form-player-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { FormPlayerComponent } from './form-player.component';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [FormPlayerComponent],
  imports: [
    CommonModule,
    FormPlayerRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  exports: [FormPlayerComponent]
})
export class FormPlayerModule { }
