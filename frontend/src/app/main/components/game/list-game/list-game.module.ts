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
import { ToastModule } from 'primeng/toast';
import { ListTeamComponent } from '../../team/list-team/list-team.component';
import { ListTeamModule } from '../../team/list-team/list-team.module';
import { TeamModule } from '../../team/team.module';


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
    ToastModule,
    TeamModule,
    SkeletonModule
  ],
  exports: [ListGameComponent]
})
export class ListGameModule { }
