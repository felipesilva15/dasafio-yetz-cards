import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./list-player/list-player.module').then(m => m.ListPlayerModule) },
    { path: 'form', loadChildren: () => import('./form-player/form-player.module').then(m => m.FormPlayerModule) },
    { path: 'form/:id', loadChildren: () => import('./form-player/form-player.module').then(m => m.FormPlayerModule) },
  ])],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
