import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Player } from 'src/app/main/api/player';
import { PlayerService } from 'src/app/main/service/player.service';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrl: './list-player.component.scss'
})
export class ListPlayerComponent {
  records: Player[] = [];
  selectedRecords: Player[] = [];
  cols: any[] = [];
  isLoading: boolean = true;
  deleteConfirmed: boolean = false;

  constructor(private playerService: PlayerService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadData();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nome' },
      { field: 'level', header: 'Nível' },
      { field: 'goalkeeper', header: 'Goleiro' }
    ];
  }

  loadData(): void {
    this.playerService.list().subscribe(
      (data: Player[]) => {
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
          this.playerService.delete(record.id).subscribe(
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
        this.playerService.delete(record.id).subscribe(
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
