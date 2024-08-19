import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGamePlayerComponent } from './list-game-player.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [ListGamePlayerComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    SkeletonModule,
    MenuModule,
    ToastModule,
  ],
  exports: [ListGamePlayerComponent]
})
export class ListGamePlayerModule { }
