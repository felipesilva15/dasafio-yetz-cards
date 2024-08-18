import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListGameRoutingModule } from './list-game-routing.module';
import { ListGameComponent } from './list-game.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [ListGameComponent],
  imports: [
    CommonModule,
    ListGameRoutingModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    MenuModule,
    SkeletonModule
  ],
  exports: [ListGameComponent]
})
export class ListGameModule { }
