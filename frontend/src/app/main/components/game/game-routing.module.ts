import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./list-game/list-game.module').then(m => m.ListGameModule) },
    { path: 'form', loadChildren: () => import('./form-game/form-game.module').then(m => m.FormGameModule) },
    { path: 'form/:id', loadChildren: () => import('./form-game/form-game.module').then(m => m.FormGameModule) },
  ])],
  exports: [RouterModule]
})
export class GameRoutingModule { }
