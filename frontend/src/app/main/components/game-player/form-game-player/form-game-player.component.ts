import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GamePlayer } from 'src/app/main/api/game-player';
import { GamePlayerRequest } from 'src/app/main/api/game-player-request';
import { Player } from 'src/app/main/api/player';
import { GameService } from 'src/app/main/service/game.service';
import { PlayerService } from 'src/app/main/service/player.service';

@Component({
  selector: 'app-form-game-player',
  templateUrl: './form-game-player.component.html',
  styleUrl: './form-game-player.component.scss'
})
export class FormGamePlayerComponent {
  data!: GamePlayerRequest;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  players!: Player[];

  constructor(
    private config: DynamicDialogConfig, 
    private ref: DynamicDialogRef,
    private gameService: GameService,
    private playerService: PlayerService,
    private fb: FormBuilder
  ) {
    this.data = {
      game_id: this.config.data?.game_id,
      confirmed: false
    };
    
    this.formGroup = this.buildFormGroup();
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    this.playerService.list().subscribe({
      next: (res) => {
        this.players = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      player_id: [this.data.player_id, [Validators.required]],
      confirmed: [this.data.confirmed, []]
    });
  }

  get player_id() {
    return this.formGroup.get('player_id');
  }

  get confirmed() {
    return this.formGroup.get('confirmed');
  }

  convertFormToObject(): void {
    this.data.player_id = this.player_id.value;
    this.data.confirmed = this.confirmed.value;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      this.scrollTop();

      return;
    }

    this.isSubmitting = true;

    this.convertFormToObject();
    this.create();
  }

  scrollTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  create(): void {
    this.gameService.createPlayer(this.data.game_id, this.data.player_id, this.data).subscribe({
      next: (res: GamePlayer) => {
        this.close(res);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  close(data?: GamePlayer) {
    this.ref.close(data);
  }
}
