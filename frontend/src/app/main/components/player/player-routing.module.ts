import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./list-player/list-player.module').then(m => m.ListPlayerModule) },
  ])],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
