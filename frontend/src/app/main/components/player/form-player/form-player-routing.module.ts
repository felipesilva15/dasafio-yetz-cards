import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPlayerComponent } from './form-player.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FormPlayerComponent }
  ])],
  exports: [RouterModule]
})
export class FormPlayerRoutingModule { }
