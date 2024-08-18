import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./list-game/list-game.module').then(m => m.ListGameModule) },
  ])],
  exports: [RouterModule]
})
export class GameRoutingModule { }
