import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/main/api/game';
import { GameService } from 'src/app/main/service/game.service';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrl: './form-game.component.scss'
})
export class FormGameComponent {
  data!: Game;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  paramId: number;

  constructor(
    private gameService: GameService, 
    private location: Location, 
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute
  ) {
    this.paramId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '');
    
    this.data = {
      date: null,
      players_per_team: null
    };
    
    this.formGroup = this.buildFormGroup();

    if (this.paramId) {
      this.loadData();
    }
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      date: [this.data.date, [Validators.required]],
      players_per_team: [this.data.players_per_team, [Validators.required, Validators.min(2)]]
    });
  }

  loadData(): void {
    this.isLoading = true;

    this.gameService.get(this.paramId).subscribe({
      next: (res: Game) => {
        this.data = res;

        this.formGroup.patchValue({
          date: new Date(<Date>this.data.date),
          players_per_team: this.data.players_per_team
        });

        this.isLoading = false;
      }
    });
  }

  get date() {
    return this.formGroup.get('date');
  }

  get players_per_team() {
    return this.formGroup.get('players_per_team');
  }

  convertFormToObject(): void {
    this.data.date = this.date.value.toISOString().substring(0, 10);;
    this.data.players_per_team = this.players_per_team.value;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      this.scrollTop();

      return;
    }

    this.isSubmitting = true;

    this.convertFormToObject();
    
    if (this.paramId) {
      this.update();
    } else {
      this.create();
    }
  }

  scrollTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  create(): void {
    this.gameService.create(this.data).subscribe({
      next: () => {
        this.backPage();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  update(): void {
    this.gameService.update(this.data, this.paramId).subscribe({
      next: () => {
        this.backPage();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  backPage(): void {
    this.location.back();
  }
}
