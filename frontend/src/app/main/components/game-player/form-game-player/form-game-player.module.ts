import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormGamePlayerComponent } from './form-game-player.component';



@NgModule({
  declarations: [FormGamePlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    InputSwitchModule,
    ReactiveFormsModule
  ],
  exports: [FormGamePlayerComponent]
})
export class FormGamePlayerModule { }
