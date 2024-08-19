import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTeamComponent } from './form-team.component';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [FormTeamComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  exports: [FormTeamComponent]
})
export class FormTeamModule { }
