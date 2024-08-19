import { CustomDynamicDialogService } from './../../../service/custom-dynamic-dialog.service';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Team } from 'src/app/main/api/team';
import { GameService } from 'src/app/main/service/game.service';
import { TeamService } from 'src/app/main/service/team.service';
import { FormTeamComponent } from '../form-team/form-team.component';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrl: './list-team.component.scss'
})
export class ListTeamComponent {
  records: Team[] = [];
  selectedRecords: Team[] = [];
  cols: any[] = [];
  isLoading: boolean = true;
  deleteConfirmed: boolean = false;
  gameId: number;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private gameService: GameService, private teamService: TeamService, private messageService: MessageService, private confirmationService: ConfirmationService, private customDynamicDialogService: CustomDynamicDialogService) {
    if(this.config.data) {
      this.gameId = this.config.data.gameId
    } else {
      this.gameId = 0
    }
  }

  ngOnInit() {
    this.loadData();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nome' },
    ];
  }

  loadData(): void {
    this.gameService.listTeams(this.gameId).subscribe(
      (data: Team[]) => {
        this.records = data;

        this.isLoading = false;
      }
    );
  }

  deleteSelectedRecords(event: Event): void {
    this.confirmationService.confirm({
      key: 'confirmDeleteDialog',
      target: event.target || new EventTarget,
      message: `Deseja mesmo deletar os registros selecionados?`,
      icon: 'pi pi-exclamation-triangle',
      header: 'Atenção',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.selectedRecords.forEach(record => {
          this.teamService.delete(record.id).subscribe(
            () => {
              this.records = this.records.filter(val => val.id !== record.id);
            }
          );
        });

        this.messageService.add({
          severity: 'success', 
          summary: 'Sucesso', 
          detail: 'Registros deletados.', 
          life: 5000 
        });
      }
    });
  }

  deleteRecord(event: Event, record: any): void {
    this.confirmationService.confirm({
      key: 'confirmDeleteDialog',
      target: event.target || new EventTarget,
      message: `Deseja mesmo deletar o registro de ID <b>${record.id}</b>?`,
      icon: 'pi pi-exclamation-triangle',
      header: 'Atenção',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.teamService.delete(record.id).subscribe(
          () => {
            this.records = this.records.filter(val => val.id !== record.id);
            this.messageService.add({
              severity: 'success', 
              summary: 'Sucesso', 
              detail: 'Registro deletado.', 
              life: 5000 
            });
          }
        );
      }
    });
  }

  openFormDialog(data?: Team, index?: number): void {
    if (!data) {
      data = {name: '', game_id: this.gameId}
    }

    this.customDynamicDialogService.openDialog<Team>(FormTeamComponent, 'Times', data, 'sm').then(
      (res: Team) => {
        if (!res) {
          return;
        }

        if (index || index === 0) {
          this.records[index] = res;
        } else {
          this.records.push(res);
        }
      }
    );;
  }
}
