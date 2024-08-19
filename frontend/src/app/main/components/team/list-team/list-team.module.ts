import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from './list-team.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [ListTeamComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    SkeletonModule
  ],
  exports: [ListTeamComponent]
})
export class ListTeamModule { }
