import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPlayerRoutingModule } from './list-player-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListPlayerComponent } from './list-player.component';


@NgModule({
  declarations: [ListPlayerComponent],
  imports: [
    CommonModule,
    ListPlayerRoutingModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    SkeletonModule
  ],
  exports: [ListPlayerComponent]
})
export class ListPlayerModule { }
