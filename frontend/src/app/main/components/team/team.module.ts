import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamModule } from './list-team/list-team.module';
import { FormTeamModule } from './form-team/form-team.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListTeamModule,
    FormTeamModule
  ]
})
export class TeamModule { }
