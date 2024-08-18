import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlayerComponent } from './list-player.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ListPlayerComponent }
  ])],
  exports: [RouterModule]
})
export class ListPlayerRoutingModule { }
