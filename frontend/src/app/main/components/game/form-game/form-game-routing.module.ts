import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGameComponent } from './form-game.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FormGameComponent }
  ])],
  exports: [RouterModule]
})
export class FormGameRoutingModule { }
