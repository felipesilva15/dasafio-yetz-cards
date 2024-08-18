import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Game } from 'src/app/main/api/game';
import { GameService } from 'src/app/main/service/game.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.scss'
})
export class ListGameComponent {
  records: Game[] = [];
  selectedRecords: Game[] = [];
  selectedRecord!: Game;
  cols: any[] = [];
  isLoading: boolean = true;
  deleteConfirmed: boolean = false;
  isLoadingMenuItem: boolean = false;
  recordMenuItems!: MenuItem[];
  @ViewChild('recordMenu') recordMenu: Menu;

  constructor(private gameService: GameService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadData();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'date', header: 'Data' },
      { field: 'players_per_team', header: 'Jogadores por time' }
    ];

    this.recordMenuItems = [
      {
        label: 'Times', 
        icon: 'pi pi-fw pi-flag-fill',
        command: () => {
          
        }
      },
      {
        label: 'Jogadores', 
        icon: 'pi pi-fw pi-users',
        command: (event) => {
          
        }
      },
      {
        separator: true
      },
      {
        label: 'Sortear times', 
        icon: 'pi pi-fw pi-megaphone',
        command: (event) => {
          
        }
      }
    ];
  }

  openRecordMenu(event: Event, record: Game) {
    this.selectedRecord = record;
    this.recordMenu.toggle(event);
  }

  loadData(): void {
    this.gameService.list().subscribe(
      (data: Game[]) => {
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
          this.gameService.delete(record.id).subscribe(
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
        this.gameService.delete(record.id).subscribe(
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
}
