import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGamePlayerModule } from './list-game-player/list-game-player.module';
import { FormGamePlayerModule } from './form-game-player/form-game-player.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListGamePlayerModule,
    FormGamePlayerModule
  ]
})
export class GamePlayerModule { }
