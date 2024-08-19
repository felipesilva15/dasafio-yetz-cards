import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';
import { GamePlayer } from 'src/app/main/api/game-player';
import { GamePlayerRequest } from 'src/app/main/api/game-player-request';
import { CustomDynamicDialogService } from 'src/app/main/service/custom-dynamic-dialog.service';
import { GameService } from 'src/app/main/service/game.service';

@Component({
  selector: 'app-list-game-player',
  templateUrl: './list-game-player.component.html',
  styleUrl: './list-game-player.component.scss'
})
export class ListGamePlayerComponent {
  records: GamePlayer[] = [];
  selectedRecords: GamePlayer[] = [];
  selectedRecord!: GamePlayer;
  cols: any[] = [];
  isLoading: boolean = true;
  deleteConfirmed: boolean = false;
  gameId: number;
  isLoadingMenuItem: boolean = false;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private gameService: GameService, private messageService: MessageService, private confirmationService: ConfirmationService, private customDynamicDialogService: CustomDynamicDialogService) {
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
    this.gameService.listPlayers(this.gameId).subscribe(
      (data: GamePlayer[]) => {
        this.records = data;

        console.log(data)

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
          this.gameService.deletePlayer(record.game_id, record.player.id).subscribe(
            () => {
              this.records = this.records.filter(val => val.player.id !== record.player.id);
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
      message: `Deseja mesmo deletar o registro?`,
      icon: 'pi pi-exclamation-triangle',
      header: 'Atenção',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.gameService.deletePlayer(record.game_id, record.player.id).subscribe(
          () => {
            this.records = this.records.filter(val => val.player.id !== record.player.id);
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

  openFormDialog(data?: GamePlayer, index?: number): void {

  }

  setPlayerConfirmed(event: Event, record: GamePlayer, index: number): void {
    this.selectedRecord = record;

    this.confirmationService.confirm({
      key: 'confirmDeleteDialog',
      target: event.target || new EventTarget,
      message: `Deseja mesmo marcar a presença do jogador como ${this.selectedRecord.confirmed ? 'não confirmada' : 'confirmada'}?`,
      icon: 'pi pi-exclamation-triangle',
      header: 'Atenção',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.isLoadingMenuItem = true;

        let data: GamePlayerRequest = { confirmed: !this.selectedRecord.confirmed };

        this.gameService.setPlayerConfirmed(this.selectedRecord.game_id, this.selectedRecord.player.id, data).subscribe({
          next: () => {
            this.selectedRecord.confirmed = !this.selectedRecord.confirmed
            this.records[index] = this.selectedRecord

            this.isLoadingMenuItem = false;
          },
          error: () => {
            this.isLoadingMenuItem = false;
          }
        });
      }
    });
  }
}
